import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
import crypto from "crypto";

export const getUserAccounts = async (req, res) => {
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
    const mainPassword = crypto.randomBytes(4).toString("hex");
    const investorPassword = crypto.randomBytes(4).toString("hex");
    const accountId = Math.floor(100000 + Math.random() * 900000);
    const newAccount = new Account({
      accountId: accountId,
      mainPassword: mainPassword,
      investorPassword: investorPassword,
      accountType: accountType,
      server: "EZICapitalManagement-Server",
      balance,
      equity: balance,
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
