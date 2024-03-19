import {login, register, getUser, verify, getAllUsers} from "../controllers/Auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", verifyToken, verifyAdmin, getAllUsers);
router.get("/me", verifyToken, getUser);
router.get("/verify/:id", verifyToken, verify);

export default router;