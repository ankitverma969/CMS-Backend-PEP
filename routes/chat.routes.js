import express from "express";
import { getChatsByThread, sendChat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:threadId", authMiddleware, getChatsByThread);
router.post("/send", authMiddleware, sendChat);

export default router;