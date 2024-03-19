import express from "express";
import { createAccount, getUserAccounts, getUserAccount, getTransactions, getMyAccounts } from "../controllers/Account.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getMyAccounts);
router.get("/all", verifyToken, verifyAdmin, getUserAccounts);
router.get("/:accountId/transactions", verifyToken, getTransactions);
router.post("/", verifyToken, createAccount);
router.get("/:accountId", verifyToken, getUserAccount);

export default router;