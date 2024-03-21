import express from "express";
import { approveWithdrawal, createWithdrawal, getAllWithdrawals, getAllWithdrawalsAdmin, getWithdrawalAdmin, rejectWithdrawal } from "../controllers/Withdrawal.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllWithdrawals);
router.post("/", verifyToken, createWithdrawal);
router.get("/all", verifyToken, verifyAdmin, getAllWithdrawalsAdmin);
router.get("/:id", verifyToken, getWithdrawalAdmin);
router.put("/:id/reject", verifyToken, verifyAdmin, rejectWithdrawal);
router.put("/:id/approve", verifyToken, verifyAdmin, approveWithdrawal);

export default router;