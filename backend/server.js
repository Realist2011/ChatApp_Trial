import dotenv from 'dotenv'
import cors from 'cors'



dotenv.config()
const PORT = process.env.PORT 
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
const app = express()
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


mongoose.connect(`${process.env.DB_PATH}/${process.env.DB_NAME}`)
.then(()=>{
    console.log("Connected to MONGO")
    app.listen(PORT,()=>console.log("Server is running on port"+PORT))
})
.catch(err=>{
    console.log(err)
})




