import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
import dotenv from "dotenv";

dotenv.config();

const laravelUrl = process.env.LARAVEL_URL;
const apiKey = process.env.LARAVEL_API_KEY;

export const getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAccounts = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await AuthModel.findById(userId);
    const accounts = await Account.find({ accountId: { $in: user.accounts } });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await AuthModel.findById(userId);
    const { leverage, accountType, balance, type } = req.body;
    const mainPassword = "B+M3IrPk";
    const investorPassword = "B+M3IrPk";
    if (!user) {
      return res.status(400).send("User not found");
    }
    // Calling Larave API to create account
    const data = {
      name: user.name,
      email: user.email,
      group: accountType === "real" ? "real/Standard" : "demo",
      leverage: leverage.toString(),
      phone: user.phone,
      main_password: mainPassword,
      investor_password: investorPassword,
      phone_password: "B+M3IrPk",
    }

    // making a post request to the laravel server
    const response = await fetch(`${laravelUrl}/api/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': `${apiKey}`
      },
      body: JSON.stringify(data)
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
      accountType: accountType,
      server: "EZICapitalManagement-Server",
      balance:0,
      equity: 0,
      type,
      leverage,
    });
    await newAccount.save();
    user.accounts.push(newAccount.accountId);
    await user.save();
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

export const getTransactions = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await Account.findOne({
      accountId
    })
    const deposits = await Deposit.find({ accountId: account._id.toString() });
    const withdrawals = await Withdrawal.find({ accountId: account._id.toString() });
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
