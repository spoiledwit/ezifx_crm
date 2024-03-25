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
    createdAt: { type: Date, expires: "5min", default: Date.now } // expires in 5min
  },
  {
    timestamps: true,
  }
);

// OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: "5min" });

const OTPModel = mongoose.model("OTP", OTPSchema);
export default OTPModel;
