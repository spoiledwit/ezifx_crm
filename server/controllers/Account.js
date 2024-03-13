import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
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