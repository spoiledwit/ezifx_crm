import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  mainPassword: {
    type: String,
    required: true,
  },
  investorPassword: {
    type: String,
    required: true,
  },
  phonePassword: {
    type: String,
    required: true,
  },
  accountType: {
    type: String
  },
  type: {
    type: String,
    default: "Demo",
  },
  server: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  equity: {
    type: Number,
    default: 0,
  },
  leverage: {
    type: Number,
    required: true,
  },
  liveStatus: {
    type: String,
    default: "Active",
  },
  totalDeposit: {
    type: Number,
    default: 0,
  },
  totalWithdrawal: {
    type: Number,
    default: 0,
  },
}, {
    timestamps: true,
});

const Account = mongoose.model("Account", AccountSchema);
export default Account;