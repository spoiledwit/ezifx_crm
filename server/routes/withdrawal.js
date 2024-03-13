import { getAllWithdrawals, createWithdrawal } from "../controllers/Withdrawal.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, getAllWithdrawals);
router.post("/", verifyToken, createWithdrawal);

export default router;