import Withdrawal from "../models/Withdrawal.js";
import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import dotenv from "dotenv";

dotenv.config();

const laravelUrl = process.env.LARAVEL_URL;
const apiKey = process.env.LARAVEL_API_KEY;

export const createWithdrawal = async (req, res) => {
  try {
    const { paymentMethod, amount, accountNumber } = req.body;
    const userId = req.userId;
    const account = await Account.findOne({
      accountId: accountNumber,
    });
    if (!account) {
      return res.status(400).send("Account not found");
    }
    const user = await AuthModel.findById(userId);
    if (!user.accounts.includes(accountNumber)) {
      return res.status(400).send("You do not have access to this account");
    }

    if (account.balance < amount) {
      return res.status(400).send("Insufficient funds");
    }

    if (account.type.toLowerCase() === "demo") {

      // making a post request to the laravel server
      const response = await fetch(`${laravelUrl}/api/make-withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${apiKey}`
        },
        body: JSON.stringify({
          amount: amount * -1,
          login: account.accountId,
        })
      });
      const result = await response.json();
      if (result.error) {
        return res.status(400).send(result.error);
      }
      account.balance -= parseInt(amount);
      await account.save();
      const withdrawal = new Withdrawal({
        paymentMethod,
        status: "Approved",
        amount,
        accountId: account._id,
        userId,
      });
      await withdrawal.save();
      return res.status(201).json(withdrawal);
    }

    const withdrawal = new Withdrawal({
      paymentMethod,
      amount,
      accountId: account._id,
      userId,
    });

    await withdrawal.save();
    res.status(201).json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllWithdrawals = async (req, res) => {
  try {
    const userId = req.userId;
    const withdrawals = await Withdrawal.find({ userId });
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllWithdrawalsAdmin = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate("accountId userId").sort("-createdAt");
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWithdrawalAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawal = await Withdrawal.findById(id);
    res.status(200).json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawal = await Withdrawal.findById(id);
    withdrawal.status = "Rejected";
    await withdrawal.save();
    res.status(200).json(withdrawal);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawal = await Withdrawal.findById(id);
    const account = await Account.findById(withdrawal.accountId);

    // making a post request to the laravel server
    const response = await fetch(`${laravelUrl}/api/make-withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': `${apiKey}`
      },
      body: JSON.stringify({
        amount: withdrawal.amount * -1,
        login: account.accountId,
      })
    });
    const result = await response.json();
    if (result.error) {
      return res.status(400).send
      (result.error);
    }
    account.balance -= parseInt(withdrawal.amount);
    await account.save();
    withdrawal.status = "Approved";
    await withdrawal.save();
    res.status(200).json(withdrawal);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};