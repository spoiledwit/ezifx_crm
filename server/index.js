import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import accountRoutes from "./routes/account.js";
import authRoutes from "./routes/authRoutes.js";
import depositRoutes from "./routes/deposit.js";
import kycRoutes from "./routes/kycRoutes.js";
import statsRoutes from "./routes/stats.js";
import ticketRoutes from "./routes/ticket.js";
import withdrawalRoutes from "./routes/withdrawal.js";

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
app.use("/ticket", ticketRoutes);

app.get("/", (req, res)=>{
  res.send("Server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
});