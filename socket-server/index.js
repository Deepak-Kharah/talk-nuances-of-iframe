const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Serve static files from the "public" directory
app.use(express.static("public"));

let totalConnections = 0;

io.on("connection", (socket) => {
  totalConnections++;
  console.log("New user connected. Total connections: " + totalConnections);

  socket.on("chat message", (msg) => {
    const { message } = JSON.parse(msg);
    console.log(`Message received: ${message}`);
    // Broadcast the message to all connected clients
    io.emit(`chat message`, message);
  });

  socket.on("chat message with hash", (msg) => {
    const { hash, message } = JSON.parse(msg);
    console.log(`Message received: ${message}`);
    // Broadcast the message to all connected clients
    io.emit(`chat message with hash ${hash}`, message);
  });

  socket.on("disconnect", () => {
    totalConnections--;
    console.log("User disconnected. Total connections: " + totalConnections);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
