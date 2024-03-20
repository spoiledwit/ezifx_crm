import express from "express";
import { approveDeposit, createDeposit, getAllDeposits, getAllDepositsAdmin, getDepositAdmin, rejectDeposit } from "../controllers/Deposit.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllDeposits);
router.get("/all", verifyToken, verifyAdmin, getAllDepositsAdmin);
router.put("/:id/reject", verifyToken, verifyAdmin, rejectDeposit);
router.put("/:id/approve", verifyToken, verifyAdmin, approveDeposit);
router.get("/:id", verifyToken, getDepositAdmin);
router.post("/", verifyToken, createDeposit);

export default router;