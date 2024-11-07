import {Server} from "socket.io";
import http from "http";
import express from "express";


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['http://localhost:3000', 'https://messagingapp-tibe.onrender.com'],
        method:['GET','POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}

io.on("connection", (socket)=>{
    //console.log("User Connected in Socket", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId !== undefined) {
        userSocketMap[userId] = socket.id;
        socket.userId = userId;
    }

    //console.log("Current Online Users:", Object.keys(userSocketMap));
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id);
        if (socket.userId) {
            delete userSocketMap[socket.userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap)); 
          }
      
          //console.log("Current Online Users After Disconnect:", Object.keys(userSocketMap));
    });
});

export {app, io, server} 
