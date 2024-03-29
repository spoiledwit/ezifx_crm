import express from "express";
import { createAccount, getAccountDetails, getAllTransactions, getAllUserTransactions, getMyAccounts, getTransactions, getUserAccount, getUserAccounts } from "../controllers/Account.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getMyAccounts);
router.get("/all", verifyToken, verifyAdmin, getUserAccounts);
router.get("/all/userTransactions", verifyToken, getAllUserTransactions);
router.get("/all/transactions", verifyToken,verifyAdmin, getAllTransactions);
router.get("/:accountId/transactions", verifyToken, getTransactions);
router.post("/", verifyToken, createAccount);
router.get("/:accountId", verifyToken, getUserAccount);
router.get("/details/:accountId", verifyToken, getAccountDetails);

export default router;