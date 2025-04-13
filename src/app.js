import express from "express";
import cookieParser from "cookie-parser";
//import routes

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use("/Blog", routes);

app.get("/", (_req,res)=>{
    res.send("Hello")
})

app.all("*", (_req,res)=>{
    res.status(404).json({
        success : false,
        message : "Route not found"
    })
})



export default app;