import dotenv from "dotenv";
import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";

dotenv.config();

const laravelUrl = process.env.LARAVEL_URL;
const apiKey = process.env.LARAVEL_API_KEY;

export const createDeposit = async (req, res) => {
  try {
    const { paymentMethod, amount, paymentProof, accountNumber } = req.body;
    const userId = req.userId;
    const account = await Account.findOne({
      accountId: accountNumber,
    });
    if (!account) {
      return res.status(400).send("Account not found");
    }
    const user = await AuthModel.findById(userId);
    if (!user.accounts.includes(accountNumber)) {
      return res.status(400).send("You don't have access to this account");
    }
    const newDeposit = new Deposit({
      paymentMethod,
      amount,
      paymentProof,
      accountId: account._id,
      userId,
    });
    await newDeposit.save();
    if (account.type.toLowerCase() === "demo") {
      account.balance += parseInt(amount);
      newDeposit.status = "Approved";
      // making a request to laravel server to update the balance
      const res = await fetch(`${laravelUrl}/api/make-deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-API-KEY': `${apiKey}`
        },
        body: JSON.stringify({
          login: account.accountId,
          amount,
        }),
      });
      const result = await res.json();
      console.log(result);
      if (result.error) {
        return res.status(400).send(result.error);
      }
      await newDeposit.save();
      await account.save();
    }
    res.status(200).json(newDeposit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDeposits = async (req, res) => {
  try {
    const userId = req.userId;
    const deposits = await Deposit.find({ userId }).populate({path:"accountId", select: "accountId"}).sort('-createdAt');
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDepositsAdmin = async (req, res) => {
  try {
    const deposits = await Deposit.find().populate("accountId userId").sort("-createdAt");
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepositAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deposit = await Deposit.findById(id);
    res.status(200).json(deposit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const deposit = await Deposit.findById(id);
    deposit.status = "Rejected";
    await deposit.save();
    res.status(200).json(deposit);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const deposit = await Deposit.findById(id);
    const account = await Account.findById(deposit.accountId);

    // making a request to laravel server to update the balance
    const response = await fetch(`${laravelUrl}/api/make-deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-API-KEY': `${apiKey}`
      },
      body: JSON.stringify({
        login: account.accountId,
        amount: deposit.amount,
      }),
    });
    const result = await response.json();
    if (result.error) {
      return res.status(400).send(result.error);
    }
    deposit.status = "Approved";
    await deposit.save();
    account.balance += parseInt(deposit.amount);
    await account.save();
    res.status(200).json(deposit);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};