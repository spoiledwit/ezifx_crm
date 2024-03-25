import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";
import OTPModel from "../models/OTP.js";
import Withdrawal from "../models/Withdrawal.js";
import { sendEmail } from "../utils/sendEmail.js";

dotenv.config();
// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, referralCode } = req.body;

    // Check if the user exists
    const oldUser = await AuthModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists with this email");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await AuthModel.create({
      name,
      email,
      hashedPassword: encryptedPassword,
      phone,
      referralCode,
    });

    console.log("sending email");
    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.userId);
    if (!user) {
      return res.status(404).send("User doesn't exist");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await AuthModel.findById(userId);
    const deposits = await Deposit.find({ userId });
    const withdrawals = await Withdrawal.find({ userId });
    const totalDeposit = deposits.reduce(
      (acc, deposit) => acc + deposit.amount,
      0
    );
    const totalWithdrawal = withdrawals.reduce(
      (acc, withdrawal) => acc + withdrawal.amount,
      0
    );
    user.toObject();
    user = { ...user._doc, totalDeposit, totalWithdrawal };
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    user.approved = true;

    await user.save();

    res.redirect(process.env.FRONTEND_URI);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await AuthModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await AuthModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const enableUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    user.isDisabled = false;
    await user.save();
    res.status(200).json(user);
    (async () => {
      await sendEmail(
        user.email,
        "Account Enabled",
        "Your account has been enabled successfully <br> You can now login to your account."
      );
    })();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const disableUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    user.isDisabled = true;
    await user.save();
    res.status(200).json(user);
    (async () => {
      await sendEmail(
        user.email,
        "Account Disabled",
        "Your account has been disabled by the admin <br> If you think this is a mistake, please contact us."
      );
    })();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    user.hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();
    res.status(200).json(user);
    (async () => {
      await sendEmail(
        user.email,
        "Password Changed",
        "Your password has been changed successfully <br> If you did not make this change, please contact us immediately."
      );
    })();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  let { userId } = req.params;

  if (!userId) {
    return res.status(400).send("Please Enter Email");
  }

  try {
    const presuer = await AuthModel.findById(userId);

    if (presuer) {
      const OTPDigits = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await OTPModel.findOne({ email: presuer?.email });

      if (existEmail) {
        const updateData = await OTPModel.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTPDigits,
          },
          { new: true }
        );
        await updateData.save();

        const to = presuer.email;
        const subject = "OTP Confirmation";
        const text = `We have received a request to reset the password for your account. To proceed, please use the following <br/>One Time Passcode (OTP): ${OTPDigits} <br/>This OTP is valid for 5 min`;
        sendEmail(to, subject, text);
      } else {
        const saveOtpData = new OTPModel({
          email: presuer?.email,
          otp: OTPDigits,
        });

        await saveOtpData.save();

        const to = presuer.email;
        const subject = "OTP Confirmation";
        const text = `We have received a request to reset the password for your account. To proceed, please use the following <br/>One Time Passcode (OTP): ${OTPDigits} <br/>This OTP is valid for 5 min`;
        sendEmail(to, subject, text);
      }
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }

  return res.status(201).json({
    success: true,
    message: "Check your mail box and verify 6 digit code",
    status: 200,
  });
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  console.log("222222222", otp);

  if (!otp) {
    return res.status(400).json({ error: "Please Enter 6 digit OTP" });
  }

  try {
    const otpverification = await OTPModel.findOne({ otp: otp });

    console.log("3333333333", otpverification);

    if (!otpverification) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (otpverification.otp === otp) {
      return res.status(201).json({
        success: true,
        message: "OTP Verified",
        status: 200,
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP", status: 400 });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid Details", error });
  }
};

export const sendPasswordResetLink = async (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Please Enter Email" });
  }

  try {
    const presuer = await AuthModel.findOne({ email: email });

    if (!presuer) {
      return res.status(400).send({ error: "Incorrect Email" });
    }

    if (presuer) {
      // token generate for reset password
      const token = jwt.sign({ _id: presuer._id }, process.env.JWT_SECRET, {
        expiresIn: 300, //expire in 5 min
      });

      const setUserToken = await AuthModel.findByIdAndUpdate(
        { _id: presuer._id },
        { verifyToken: token },
        { new: true }
      );

      const link = `${process.env.FRONTEND_URI}/reset-password/${presuer._id}/${setUserToken.verifyToken}`;

      const to = presuer.email;
      const subject = "Password Reset Instructions";
      const text = `You have requested to reset your password. Please follow the link below to reset your password: </br> Link: ${link} <br/>This Link is valid for 5 min`;
      sendEmail(to, subject, text);
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }

  return res.status(201).json({
    success: true,
    message: "Check your mail box",
    status: 200,
  });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  if (!password || !id || !token) {
    return res.status(400).send({ error: "Please Enter all the fields" });
  }

  try {
    const validuser = await AuthModel.findById(id);

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (validuser && verifyToken._id) {
      const newPassword = await bcrypt.hash(password, 10);

      const setNewUserPass = await AuthModel.findByIdAndUpdate(
        { _id: id },
        { hashedPassword: newPassword, verifyToken: "" }
      );

      console.log("pppppppppppppp", validuser);

      await OTPModel.deleteOne({ email: validuser.email });

      setNewUserPass.save();
      res
        .status(201)
        .json({ status: 200, message: "Password has been reset successfully" });
    } else {
      res.status(401).json({ status: 401, message: "User does not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
