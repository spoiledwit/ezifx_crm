import { getAllWithdrawals, createWithdrawal, getAllWithdrawalsAdmin, getWithdrawalAdmin, rejectWithdrawal, approveWithdrawal } from "../controllers/Withdrawal.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, getAllWithdrawals);
router.post("/", verifyToken, createWithdrawal);
router.get("/all", verifyToken, verifyAdmin, getAllWithdrawalsAdmin);
router.get("/:id", verifyToken, verifyAdmin, getWithdrawalAdmin);
router.put("/:id/reject", verifyToken, verifyAdmin, rejectWithdrawal);
router.put("/:id/approve", verifyToken, verifyAdmin, approveWithdrawal);

export default router;