import express from "express";
import {
    disableUser,
    enableUser,
    getAllUsers,
    getUser,
    getUserById,
    login,
    register,
    sendOtp,
    sendPasswordResetLink,
    updatePassword,
    updateUser,
    verify,
    verifyOtp,
} from "../controllers/Auth.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", verifyToken, verifyAdmin, getAllUsers);
router.get("/me", verifyToken, getUser);
router.get("/verify/:id", verifyToken, verify);
router.get("/getUserById/:userId", verifyToken, verifyAdmin, getUserById);

router.post("/otp", sendOtp);
router.post("/otp/verify", verifyOtp);
router.post("/password-reset-link", sendPasswordResetLink);

router.put("/disable/:id", verifyToken, verifyAdmin, disableUser);
router.put("/enable/:id", verifyToken, verifyAdmin, enableUser);
router.put("/update/:id", verifyToken, verifyAdmin, updateUser);

router.put("/updatePassword/:id", verifyToken, updatePassword);

export default router;
