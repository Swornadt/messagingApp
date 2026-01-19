//method 2: const express = require('express')
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT =  process.env.PORT || 8080;
const __dirname = path.resolve();

//middleware:
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: [
        'http://localhost:3000',
        'https://messagingapp-tibe.onrender.com'
    ],
    credentials: true
};
app.use(cors(corsOption));

//routes:
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
//app.use("/api/v1/notifications",notificationRoute);
//http://localhost:8080/api/v1/user/register


//Server static assets:
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (_,res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

server.listen(PORT, () => {
    databaseConnection();
    console.log(`Server listening at ${PORT}`);
})