import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";

export const getTotalDW = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await AuthModel.findById(userId);
        const accounts = await Account.find({ accountId: { $in: user.accounts } });
        let totalDeposit = 0;
        let totalWithdrawal = 0;
        let totalBalance = 0;
        accounts.forEach((account) => {
            totalDeposit += account.totalDeposit;
            totalWithdrawal += account.totalWithdrawal;
            totalBalance += account.balance;
        });
        res.status(200).json({ totalDeposit, totalWithdrawal, totalBalance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};