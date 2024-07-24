import dotenv from 'dotenv'
import cors from 'cors'



dotenv.config()
const PORT = process.env.PORT 
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import {app,server} from './socket/socket.js'
// const __dirname=path.resolve()
// console.log(__dirname)
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use( cors(corsOptions) );

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

// app.use(express.static(path.join(__dirname,"/frontend/dist")))
// app.get("*",(req,res)=>{
//     res.sendFile('C:\Users\ 91859\Documents\WEB DEV1\WEB DEV\Chat_App_Trial\frontend\dist\index.html')
// })
mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
.then(()=>{
    console.log("Connected to MONGO")
    server.listen(PORT,()=>console.log("Server is running on port"+PORT))
})
.catch(err=>{
    console.log(err)
})




