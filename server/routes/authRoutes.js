import express from "express";
import { getAllUsers, getUser, getUserById, login, register, verify, enableUser,disableUser, updateUser, updatePassword } from "../controllers/Auth.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", verifyToken, verifyAdmin, getAllUsers);
router.get("/me", verifyToken, getUser);
router.get("/verify/:id", verifyToken, verify);
router.get("/getUserById/:userId", verifyToken, verifyAdmin, getUserById);

router.put("/disable/:id", verifyToken, verifyAdmin, disableUser);
router.put("/enable/:id", verifyToken, verifyAdmin, enableUser);
router.put("/update/:id", verifyToken, verifyAdmin, updateUser);

router.put("/updatePassword/:id", verifyToken, verifyAdmin, updatePassword);

export default router;