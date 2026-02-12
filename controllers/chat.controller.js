import { getChatByThreadService, sendChatService } from "../services/chat.service.js";

export const  getChatsByThread = async (req, res) => {

    try {
        const { threadId } = req.params;
        const chats = await getChatByThreadService(threadId);
        res.status(200).json({
            success: true,
            chats
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch chats",
            error: error.message
        });
    }
};

export const sendChat = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const chat = await sendChatService({
            senderId : req.user.id,
            receiverId,
            message
        });
        res.status(200).json({
            success: true,
            chat
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send chat",
            error: error.message
        });
    }
};