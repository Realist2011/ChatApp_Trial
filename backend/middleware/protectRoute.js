import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


const protectRoute =async(req,res,next)=>{
    try {
        console.log("yahan phassa ")
        // const token = req.cookies.jwt
        // const cookieValue = req.headers.cookie.split('=')[1];
        // console.log(cookieValue)
        console.log(req.headers.cookie)
        // const token =await req.cookie.jwt
        const token1 = await sessionStorage.getItem('jwt')
        console.log(`Token yeh hai-${token}`)
        if(!token1){
            return res.status(401).json({error:"Unauthorized:No Token Provided"})
        }

        const decoded = jwt.verify(token1,process.env.JWT_SECRET)
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
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
        
    }
}

export default protectRoute