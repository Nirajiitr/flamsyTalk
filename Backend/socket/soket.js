import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    
    origin: ["https://flamsytalk.onrender.com"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiver) => {
  return userSocketMap[receiver];
};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log(`User ${userId} disconnected`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
