import express from "express";
import { createAccount, getAccountDetails, getAllTransactions, getAllUserTransactions, getMyAccounts, getTransactions, getUserAccount, getUserAccounts } from "../controllers/Account.js";
import { createTicket, getTicketDetails, getUserTicket } from "../controllers/Ticket.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createTicket);
router.get("/userTickets", verifyToken, getUserTicket);
router.get("/:id", verifyToken, getTicketDetails);


export default router;