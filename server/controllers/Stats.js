import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";

export const getTotalDW = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await AuthModel.findById(userId);
    const accounts = await Account.find({ accountId: { $in: user.accounts } });
    const deposits = await Deposit.find({userId});
    const withdrawals = await Withdrawal.find({userId});
    let totalDeposit = 0;
    let totalWithdrawal = 0;
    let totalBalance = 0;
    accounts.forEach((account) => {
      totalBalance += account.balance;
    });
    deposits.forEach((deposit) => {
      totalDeposit += deposit.amount;
    });
    withdrawals.forEach((withdrawal) => {
      totalWithdrawal += withdrawal.amount;
    });
    res.status(200).json({ totalDeposit, totalWithdrawal, totalBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Stats
export const getAdminStats = async (req, res) => {
  try {
    const users = await AuthModel.find();
    let totalUsers = 0,
      activeUsers = 0,
      emailUnverifiedUsers = 0,
      totalDeposit = 0,
      pendingDeposit = 0,
      rejectedDeposit = 0,
      depositedCharge = 0,
      totalWithdrawal = 0,
      pendingWithdrawal = 0,
      rejectedWithdrawal = 0,
      withdrawalCharge = 0;
    users.forEach((user) => {
      totalUsers++;
      if (!user.approved) {
        emailUnverifiedUsers++;
      } else {
        activeUsers++;
      }
    });
    const deposits = await Deposit.find();
    deposits.forEach((deposit) => {
      totalDeposit += deposit.amount;
      if (deposit.status === "Pending") {
        pendingDeposit+= deposit.amount;
      } else if (deposit.status === "Rejected") {
        rejectedDeposit+= deposit.amount;
      }
    });
    const withdrawals = await Withdrawal.find();
    withdrawals.forEach((withdrawal) => {
      totalWithdrawal += withdrawal.amount;
      if (withdrawal.status === "Pending") {
        pendingWithdrawal+= withdrawal.amount;
      } else if (withdrawal.status === "Rejected") {
        rejectedWithdrawal+= withdrawal.amount;
      }
    });

    res.status(200).json({
      totalUsers,
      activeUsers,
      emailUnverifiedUsers,
      totalDeposit,
      pendingDeposit,
      rejectedDeposit,
      depositedCharge,
      totalWithdrawal,
      pendingWithdrawal,
      rejectedWithdrawal,
      withdrawalCharge,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
