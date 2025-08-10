import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4001", // FRONTEND URL
        methods: ["GET", "POST"]
    }
});

// real time messages

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}

const users = {};

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    console.log("User ID from query:", socket.handshake.query.userId);


    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log(" Active Users:", users);
    }

    // isse yeh pta chalega kon kon se user online hai

    io.emit("getOnline", Object.keys(users))

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        // Remove user from active list
        delete users[userId];
        io.emit('getOnline', Object.keys(users));
    });
});




export { app, io, server }