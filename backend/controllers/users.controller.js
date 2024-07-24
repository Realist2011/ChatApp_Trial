import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
export const getUsersForSideBar = async(req,res,next)=>{
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
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id:{$ne:loggedInUserId}}).select("-password")
        // console.log(filteredUsers)
        return res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error)
        console.error("Error in getUsersForSideBar",error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }

}