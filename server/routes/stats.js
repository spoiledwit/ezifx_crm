import { getTotalDW, getAdminStats } from "../controllers/Stats.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/totalDW", verifyToken, getTotalDW);
router.get("/adminStats", verifyToken, verifyAdmin, getAdminStats);

export default router;