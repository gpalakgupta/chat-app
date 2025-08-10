import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4001",
        methods: ["GET", "POST"]
    }
});

// users = { userId: Set(socketId) }
const users = {};

// Function to get all socket IDs of a receiver
export const getReceiverSocketIds = (receiverId) => {
    return users[receiverId] ? Array.from(users[receiverId]) : [];
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        if (!users[userId]) users[userId] = new Set();
        users[userId].add(socket.id);
        console.log("User connected:", userId, socket.id);
    }

    // Emit online users list
    io.emit("getOnline", Object.keys(users));

    socket.on("disconnect", () => {
        if (userId && users[userId]) {
            users[userId].delete(socket.id);
            if (users[userId].size === 0) {
                delete users[userId];
            }
        }
        io.emit("getOnline", Object.keys(users));
        console.log("User disconnected:", userId, socket.id);
    });
});

export { app, io, server };
