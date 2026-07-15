import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js'
import { Server } from 'socket.io';

// Create an Express app and http server
const app = express();
const server = http.createServer(app);              // socket.io support http server that by use http

// initialize the socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

// store online users
export const userSocketMap = {}; // {userrId : socketio}

// Socket.io connnection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connection", userId);

    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

// Middleware
app.use(express.json({limit: "10mb"}));            // Parse JSON bodies like images with a size limit of 10mb
app.use(cors());        // Enable CORS for all routes, provide route to url

// Routes Setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter)

// Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is  running on PORT: " + PORT));