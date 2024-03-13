import express from "express";
import { createAccount, getUserAccounts } from "../controllers/Account.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUserAccounts);
router.post("/", verifyToken, createAccount);

export default router;