import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {  getmessage,  getUserForSidebar,  markMessageAsSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSidebar);
messageRouter.get("/:id", protectRoute, getmessage);
messageRouter.put("/mark", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage  )

export default messageRouter;