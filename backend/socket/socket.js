import { Server } from "socket.io";
import http from "http";
import express from "express";
import GameManager from "../game/GameManager.js";

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

const gameManager = new GameManager();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // if (userId !== "undefined") {
  //   userSocketMap[userId] = socket.id;
  //   io.emit("getOnlineUsers", Object.keys(userSocketMap));
  //   console.log(userSocketMap)
  // }
  // gameManager.addUser(socket);
  // console.log(gameManager.users)
  const userId = socket.handshake.query.userId;
  // console.log(userId);
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // console.log(userSocketMap)
    if (!gameManager.users.includes(socket)) {
      gameManager.addUser(socket);
    }

    // console.log(gameManager.users.length)
  }

  // socket.on("message",(data)=>{
  //   console.log("message is",data)
  //   console.log("ok");
  // })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId !== "undefined") {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
    gameManager.removeUser(socket);
    // console.log(userSocketMap)
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
