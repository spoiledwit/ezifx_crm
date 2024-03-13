import { getAllDeposits, createDeposit } from "../controllers/Deposit.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, getAllDeposits);
router.post("/", verifyToken, createDeposit);

export default router;