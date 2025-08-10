import mongoose from "mongoose";
import Conversation from "../models/conversation_model.js";
import Message from "../models/message_model.js";
import { getReceiverSocketIds, io } from "../socketIo/server.js";  // import io and getReceiverSocketIds

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverIdRaw } = req.params;
        const senderIdRaw = req.user._id;

        const sanitizeId = (id) => id.toString().replace(/^:/, '');
        const senderId = sanitizeId(senderIdRaw);
        const receiverId = sanitizeId(receiverIdRaw);

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

        // Emit to all sockets of receiver
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        receiverSocketIds.forEach(socketId => {
            io.to(socketId).emit("newMessage", newMessage);
        });

        const messageObj = newMessage.toObject();
        messageObj.senderId = senderId.toString();
        messageObj.receiverId = receiverId.toString();

        res.status(201).json(messageObj);
    } catch (err) {
        console.log("err in sending message", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const senderId = req.user._id.toString();
        const chatuser = req.params.id.toString();

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatuser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({ message: "No conversation found" });
        }

        const messages = conversation.messages;
        res.status(200).json({ messages });
    } catch (err) {
        console.log("Message getting error", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
