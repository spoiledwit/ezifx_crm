import express from "express";
import { createAccount, getUserAccounts, getUserAccount, getTransactions } from "../controllers/Account.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUserAccounts);
router.get("/:accountId/transactions", verifyToken, getTransactions);
router.post("/", verifyToken, createAccount);
router.get("/:accountId", verifyToken, getUserAccount);

export default router;