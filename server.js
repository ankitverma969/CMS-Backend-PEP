import "dotenv/config.js";
import dotenv from "dotenv"; 
dotenv.config()

import app from "./app.js"
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { Server } from "socket.io";
import http from "http";
import { registerSocketHandlers } from "./socket/socket.js";


connectDB();
connectCloudinary();
const PORT = process.env.PORT; 

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        // methods: ["GET", "POST"]
        credentials: true
    }
});

registerSocketHandlers(io);


app.listen(PORT,(err,data)=>{
    if(err){
        console.log("Error starting server:", err);
    } else {
        console.log(`Listening on PORT ${PORT}`);
    }
})