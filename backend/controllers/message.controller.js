import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const sendMessage=async(req,res)=>{
    try {
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
        if(newMessage){
            await newMessage.save()
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }
        return res.status(200).json({
           newMessage
        })
    } catch (error) {
        console.log("Errror in sendMessage",error.message)
        res.status(500).json({
            
            error:"Internal Server Error"
        })



        
    }
}

export const getMessages = async(req,res,next)=>{
    try {
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