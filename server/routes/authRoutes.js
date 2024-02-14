import {login, register, getUser, verify} from "../controllers/Auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/verify/:id", verifyToken, verify);

export default router;