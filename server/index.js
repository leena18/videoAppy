import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRouters from "./routes/auths.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const connect =() => {
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((err) =>{
        throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/auths", authRouters);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
    success: false,
    status,
    message
})
})
app.listen(8800, ()=>{
    connect()
    console.log("Connected to server")
})