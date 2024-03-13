import { getTotalDW } from "../controllers/stats.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/totalDW", verifyToken, getTotalDW);

export default router;