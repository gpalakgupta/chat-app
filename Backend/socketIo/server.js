import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://localhost:4001",
        methods:["GET","POST"]
    }
});

// yeh hamare server side ke evenets ko listen krta hai 
io.on("connection",(socket)=>{
    console.log("new client connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("client disconnected",socket.id);
    })
})

export {app,io,server}