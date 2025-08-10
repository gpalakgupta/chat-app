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

const users = {};

io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log(" Active Users:", users);
    }

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        // Remove user from active list
        for (const id in users) {
            if (users[id] === socket.id) {
                delete users[id];
                break;
            }
        }
    });
});

 


export {app,io,server}