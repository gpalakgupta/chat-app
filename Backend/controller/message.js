import mongoose from "mongoose";
import Conversation from "../models/conversation_model.js";
import Message from "../models/message_model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverIdRaw } = req.params;
        const senderIdRaw = req.user._id;

        // Sanitize IDs (remove colon if any)
        const sanitizeId = (id) => id.toString().replace(/^:/, '');

        const senderId = sanitizeId(senderIdRaw);
        const receiverId = sanitizeId(receiverIdRaw);

        // Optional: Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid user IDs" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId],
                messages: []   
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([
            conversation.save(),
            newMessage.save()
        ]);

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (err) {
        console.log("err in sending message", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
