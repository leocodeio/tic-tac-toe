import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(userSocketMap)
  }

  socket.on("message",(data)=>{
    console.log("message is",data)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId !== "undefined") {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
    console.log(userSocketMap)
  });

  socket.on("logout", () => {
    if (userId !== "undefined") {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      socket.disconnect();
    }
  });
});

export { app, io, server, getReceiverSocketId };
