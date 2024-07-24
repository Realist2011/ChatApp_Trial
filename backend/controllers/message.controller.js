import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import jwt from 'jsonwebtoken'

import User from "../models/user.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"


export const sendMessage=async(req,res)=>{
    try {
        let {token} = req.body
        token =  await JSON.parse(token)
        console.log(token)
        if(!token){
            return res.status(401).json({error:"Unauthorized:No Token Provided"})
        }

        const decoded = await  jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized:Invalid Token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
        req.user = user;
        const {message} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]

            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],

            })
        }

        const newMessage = new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message


        })
        await newMessage.save()
        if(newMessage){
            // await newMessage.save()
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            // io.to.emit sends events to specific clients
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        return res.status(200).json({
           newMessage
        })
    } catch (error) {
        console.log("Errror in sendMessage",error.message)
        console.log(error)
        res.status(500).json({
            
            error:"Internal Server Error"
        })



        
    }
}

export const getMessages = async(req,res,next)=>{
    try {
        let {token} = req.body
        token =  await JSON.parse(token)
        // console.log(token)
        if(!token){
            return res.status(401).json({error:"Unauthorized:No Token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized:Invalid Token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
        req.user = user;
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")
        if(!conversation){
            return res.status(200).json([])
        }

        return res.status(200).json(conversation.messages)



    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:"Internal server error"})
        
    }

}