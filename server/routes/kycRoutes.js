import { createKyc } from "../controllers/Kyc.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createKyc);

export default router;