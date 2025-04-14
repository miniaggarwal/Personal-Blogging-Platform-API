import express from "express";
import cookieParser from "cookie-parser";
import { Router } from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const router = Router();

app.use(express.json());
app.use(cookieParser());

app.use("/Blog", userRoutes);

app.get("/", (_req,res)=>{
    res.status(404).json({
        success : false,
        message : "Route not found"
    })
})

// app.all("*", (_req,res)=>{
//     res.status(404).json({
//         success : false,
//         message : "Route not found"
//     })
// })



export default app;