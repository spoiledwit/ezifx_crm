import crypto from "crypto";
import dotenv from "dotenv";
import Account from "../models/Account.js";
import AuthModel from "../models/Auth.js";
import Deposit from "../models/Deposit.js";
import Ticket from "../models/Ticket.js";
import Withdrawal from "../models/Withdrawal.js";

dotenv.config();

const laravelUrl = process.env.LARAVEL_URL;
const apiKey = process.env.LARAVEL_API_KEY;

export const createTicket = async (req, res) => {
  try {
    const userId = req.userId;

    const { subject, message, priority, attachments } = req.body;

    const ticket = new Ticket({
      userId,
      subject,
      priority,
      attachments,
      latestMessage: message,
      messages: [{ content: message, senderId: userId }],
    });
    await ticket.save();

    if (!ticket) {
      return res.status(400).send("Ticket not generated");
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserTicket = async (req, res) => {
  try {
    const userId = req.userId;

    const tickets = await Ticket.find({ userId: userId }).sort("-createdAt");

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(400).send("Not Found");
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { ticketId } = req.params;
  const { content } = req.body;
  const senderId = req.userId;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Create a new message
    const newMessage = {
      content,
      senderId,
    };

    ticket.messages.push(newMessage);

    const existingUser =await AuthModel.findById(senderId);

    console.log('333333', existingUser)

    if (existingUser && existingUser.isAdmin) {
      ticket.latestReply = content;

    } else {
      ticket.latestMessage = content;
    }

    // Save the updated ticket
    await ticket.save();

    res.status(201).json({ message: "Message sent successfully", ticket });
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ error: error.message });
  }
};
