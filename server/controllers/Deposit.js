import Deposit from "../models/Deposit.js";
import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";

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
    res.status(200).json(newDeposit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDeposits = async (req, res) => {
  try {
    const userId = req.userId;
    const deposits = await Deposit.find({ userId });
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
