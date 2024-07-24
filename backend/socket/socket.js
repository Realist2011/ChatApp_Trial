import {Server} from 'socket.io';
import http from 'http';
import express from 'express'

const app = express()


const server = http.createServer(app)
const io = new Server(server,{
cors:{
    origin:["http://localhost:5173"],
    methods:['GET','POST']

}})

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {} //{userId:socketId}
io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)
    const userId = socket.handshake.query.userId
    if(userId !="undefined") userSocketMap[userId]=socket.id
    io.emit("getOnlineUser",Object.keys(userSocketMap))
    // socket.on() is used to listen to the events . can be used both on client and server sides 
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUser",Object.keys(userSocketMap))
    })
})
export {app,io,server}