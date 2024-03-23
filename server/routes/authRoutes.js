import express from "express";
import { getAllUsers, getUser, getUserById, login, register, verify } from "../controllers/Auth.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", verifyToken, verifyAdmin, getAllUsers);
router.get("/me", verifyToken, getUser);
router.get("/verify/:id", verifyToken, verify);

router.get("/getUserById/:userId", verifyToken, getUserById);

export default router;