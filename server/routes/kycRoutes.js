import { createKyc, createManualKyc, getKyc, getAllKycs, approveKyc, rejectKyc } from "../controllers/Kyc.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, getKyc);
router.post("/", verifyToken, createKyc);
router.post("/manual", verifyToken, createManualKyc);
router.get("/all", verifyToken, verifyAdmin, getAllKycs);
router.put("/approve/:id", verifyToken, verifyAdmin, approveKyc);
router.put("/reject/:id", verifyToken, verifyAdmin, rejectKyc);

export default router;