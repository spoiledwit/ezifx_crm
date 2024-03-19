import { getAllDeposits, createDeposit, getAllDepositsAdmin, getDepositAdmin, rejectDeposit, approveDeposit } from "../controllers/Deposit.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, getAllDeposits);
router.get("/all", verifyToken, verifyAdmin, getAllDepositsAdmin);
router.put("/:id/reject", verifyToken, verifyAdmin, rejectDeposit);
router.put("/:id/approve", verifyToken, verifyAdmin, approveDeposit);
router.get("/:id", verifyToken, verifyAdmin, getDepositAdmin);
router.post("/", verifyToken, createDeposit);

export default router;