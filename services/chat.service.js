import Chat from "../models/chat.js";
import Thread from "../models/thread.js";

export const getChatByThreadService = async (threadId) => {
    return await Chat.find({ thread: threadId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 });
};

export const sendChatService = async ({
    senderId,
    receiverId,
    message
}) => {
     
    // Ensure the thread exists
    const thread = await findOrCreateThreadService(senderId, receiverId);

    // Create the chat message
    const chat = await Chat.create({
        thread: thread._id,
        sender: senderId,
        message  
    });

    // Update the thread's last message
    thread.lastMessage = message;
    // thread.lastMessageAt = new Date();
    await thread.save();

    return chat;
};

export const findOrCreateThreadService = async (userId1, userId2) => {

    // Sort user IDs to ensure consistent ordering
    console.log(`Finding or creating thread for users: ${userId1} and ${userId2}`);
    const participants = [userId1, userId2].sort();

    // Try to find an existing thread with these participants
    let threads = await Thread.findOne({
        participants: { $all: participants},
        $expr: { $eq: [{ $size: "$participants" }, 2] }
    });

    // If no thread exists, create a new one
    if (!threads) {
        threads = await Thread.create({
            participants
        });
    }
    return threads;
};