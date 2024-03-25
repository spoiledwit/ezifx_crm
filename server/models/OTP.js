import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },

    otp: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, expires: 300, default: Date.now } // expires in
  },
  {
    timestamps: true,
  }
);

const OTPModel = mongoose.model("OTP", OTPSchema);
export default OTPModel;
