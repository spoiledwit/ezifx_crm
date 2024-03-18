import Withdrawal from "../models/Withdrawal.js";
import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";

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
      account.balance -= amount;
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
      accountId: accountNumber,
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
