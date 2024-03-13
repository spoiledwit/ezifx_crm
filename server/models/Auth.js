import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    hasKYC: {
      type: Boolean,
      default: false,
    },
    kycRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kyc",
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
    },
    postalCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    accounts: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;
