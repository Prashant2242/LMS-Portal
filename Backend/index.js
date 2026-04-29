import express from "express";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser"
import authRouter from "./route/authRoutes.js";
import cors from "cors";
 
import dotenv  from "dotenv";
import userRouter from "./route/userRoute.js";
dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);


const PORT=process.env.PORT;

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}))   //it makes the connectivity between frontned and backend on this URL

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res)=>{
    res.send("hello from server");
})


app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
    connectDB();
});
