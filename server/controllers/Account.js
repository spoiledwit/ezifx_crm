import crypto from "crypto";
import dotenv from "dotenv";
import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
import {sendEmail} from "../utils/sendEmail.js"

dotenv.config();

const laravelUrl = process.env.LARAVEL_URL;
const apiKey = process.env.LARAVEL_API_KEY;

// making a dictionary of key value pairs
const accountTypeDict = {
  "ecn": "real\\ECN",
  "pro": "real\\PRO",
  "prime":"real\\Prime",
  "zero": "real\\Zero"
};

export const getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().populate("userId").sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAccounts = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await AuthModel.findById(userId);
    const accounts = await Account.find({ accountId: { $in: user.accounts } }).sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const passwordGenerator = () => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "#@!";
  const allChars = lowercase + uppercase + numbers + specialChars;
  let password = "";
  password += lowercase[crypto.randomInt(0, lowercase.length)];
  password += uppercase[crypto.randomInt(0, uppercase.length)];
  password += numbers[crypto.randomInt(0, numbers.length)];
  password += specialChars[crypto.randomInt(0, specialChars.length)];

  for (let i = 4; i < 12; i++) {
    password += allChars[crypto.randomInt(0, allChars.length)];
  }

  return password;
};
export const createAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await AuthModel.findById(userId);
    const { leverage, accountType, type } = req.body;
    const mainPassword = passwordGenerator();
    const investorPassword = passwordGenerator();
    const phonePassword = passwordGenerator();

    if (!user) {
      return res.status(400).send("User not found");
    }

    let accountGroup = type.toLowerCase().includes("real") ? accountTypeDict[accountType] : "demo\\usd";

    if (!accountGroup) {
      return res.status(400).send("Invalid account type");
    }
    
    const data = {
      name: user.name,
      email: user.email,
      group: accountGroup,
      leverage: leverage.toString(),
      phone: user.phone,
      main_password: mainPassword,
      investor_password: investorPassword,
      phone_password: phonePassword,
    };

    // making a post request to the laravel server
    const response = await fetch(`${laravelUrl}/api/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      return res.status(400).send(result.error);
    }
    const accountId = result.login;
    const newAccount = new Account({
      accountId: accountId,
      mainPassword: mainPassword,
      investorPassword: investorPassword,
      phonePassword: phonePassword,
      accountType: accountType,
      userId: userId,
      server: "EZICapitalManagement-Server",
      balance: 0,
      equity: 0,
      type,
      leverage,
    });
    await newAccount.save();
    user.accounts.push(newAccount.accountId);
    await user.save();
    const to = user.email;
    const subject = type.toLowerCase().includes("real") ? "Real Account Created" : "Demo Account Created";
    const text = `Your account has been created successfully. <br/>Account Login: ${accountId} <br/>Main Password: ${mainPassword} <br/>Investor Password: ${investorPassword} <br/>Phone Password: ${phonePassword}`;
    sendEmail(to, subject, text);
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await AuthModel.findById(userId);
    const { accountId } = req.params;
    const account = await Account.findOne({ accountId });
    if (!account) return res.status(404).json({ message: "Account not found" });
    if (!user.accounts.includes(accountId))
      return res.status(403).json({ message: "Unauthorized" });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAccountDetails = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);

    if (!account) return res.status(404).json({ message: "Account not found" });

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await Account.findOne({
      accountId,
    });
    const deposits = await Deposit.find({ accountId: account._id.toString() });
    const withdrawals = await Withdrawal.find({
      accountId: account._id.toString(),
    });
    let transactions = [];
    deposits.forEach((deposit) => {
      transactions.push({
        type: "deposit",
        status: deposit.status,
        amount: deposit.amount,
        date: deposit.createdAt,
      });
    });
    withdrawals.forEach((withdrawal) => {
      transactions.push({
        type: "withdrawal",
        status: withdrawal.status,
        amount: withdrawal.amount,
        date: withdrawal.createdAt,
      });
    });
    transactions.sort((a, b) => b.date - a.date);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserTransactions = async (req, res) => {
  try {
    const userId = req.userId;
   
    const deposits = await Deposit.find({ userId: userId });
    const withdrawals = await Withdrawal.find({
      userId: userId,
    });
    let transactions = [];
    deposits.forEach((deposit) => {
      transactions.push({
        type: "deposit",
        status: deposit.status,
        amount: deposit.amount,
        date: deposit.createdAt,
      });
    });
    withdrawals.forEach((withdrawal) => {
      transactions.push({
        type: "withdrawal",
        status: withdrawal.status,
        amount: withdrawal.amount,
        date: withdrawal.createdAt,
      });
    });
    transactions.sort((a, b) => b.date - a.date);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {   
    const deposits = await Deposit.find().populate({path: "userId", select: "name"});
    const withdrawals = await Withdrawal.find().populate({path: "userId", select: "name"});
    let transactions = [];
    deposits.forEach((deposit) => {
      transactions.push({
        type: "deposit",
        status: deposit.status,
        amount: deposit.amount,
        date: deposit.createdAt,
        userId: deposit.userId
      });
    });
    withdrawals.forEach((withdrawal) => {
      transactions.push({
        type: "withdrawal",
        status: withdrawal.status,
        amount: withdrawal.amount,
        date: withdrawal.createdAt,
        userId: withdrawal.userId
      });
    });
    transactions.sort((a, b) => b.date - a.date);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
