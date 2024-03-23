import express from "express";
import { createAccount, getAccountDetails, getAllTransactions, getAllUserTransactions, getMyAccounts, getTransactions, getUserAccount, getUserAccounts } from "../controllers/Account.js";
import { createTicket, getAllTickets, getTicketDetails, getUserTicket, sendMessage } from "../controllers/Ticket.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createTicket);
router.get("/userTickets", verifyToken, getUserTicket);
router.get("/:id", verifyToken, getTicketDetails);
router.get("/",verifyToken, verifyAdmin,  getAllTickets);


router.post("/send-message/:ticketId",verifyToken,  sendMessage);


export default router;