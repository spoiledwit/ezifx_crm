import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/account.js";
import statsRoutes from "./routes/stats.js";
import depositRoutes from "./routes/deposit.js";
import withdrawalRoutes from "./routes/withdrawal.js";
import kycRoutes from "./routes/kycRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174", "https://ezifx-crm.vercel.app", "http://localhost:3000", "http://localhost:3001", "https://ezifx-crm-new.vercel.app"],
  }), 
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 });

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected");
});

db.on("error", (error) => {
  console.log(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/stats", statsRoutes);
app.use("/deposit", depositRoutes);
app.use("/withdrawal", withdrawalRoutes);
app.use("/kyc", kycRoutes);

app.get("/", (req, res)=>{
  res.send("Server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
});