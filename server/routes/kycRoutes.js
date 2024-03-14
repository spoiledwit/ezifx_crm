import { createKyc, createManualKyc, getKyc } from "../controllers/Kyc.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getKyc);
router.post("/", verifyToken, createKyc);
router.post("/manual", verifyToken, createManualKyc);

export default router;