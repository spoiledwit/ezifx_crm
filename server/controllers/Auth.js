import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Deposit from "../models/Deposit.js";
import Withdrawal from "../models/Withdrawal.js";
import AuthModel from "../models/Auth.js";
import {sendEmail} from "../utils/sendEmail.js"

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
    const {userId} = req.params
    let user = await AuthModel.findById(userId);
    const deposits = await Deposit.find({userId});
    const withdrawals = await Withdrawal.find({userId});
    const totalDeposit = deposits.reduce((acc, deposit) => acc + deposit.amount, 0);
    const totalWithdrawal = withdrawals.reduce((acc, withdrawal) => acc + withdrawal.amount, 0);
    user.toObject();
    user = {...user._doc, totalDeposit, totalWithdrawal}
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
}

export const enableUser = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    user.isDisabled = false;
    await user.save();
    res.status(200).json(user);
    (async () => {
      await sendEmail(user.email, "Account Enabled", "Your account has been enabled successfully <br> You can now login to your account.");
    }
    )();
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
      await sendEmail(user.email, "Account Disabled", "Your account has been disabled by the admin <br> If you think this is a mistake, please contact us.");
    }
    )();
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
      await sendEmail(user.email, "Password Changed", "Your password has been changed successfully <br> If you did not make this change, please contact us immediately.");
    }
    )();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};