import mongoose from "mongoose";

const DepositSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentProof: {
      type: String,
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Deposit = mongoose.model("Deposit", DepositSchema);
export default Deposit;
