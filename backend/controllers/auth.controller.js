import User from "../models/user.model.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import generateTokenandSetCookie from "../utils/generateToken.js"
export const signUpUser = async(req,res)=>{
    try {
        console.log("hey")
        const {fullName,username,password,confirmPassword,gender} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({error:'Passwords dont match'})
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({
                error:"Username already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender ==="male"?boyProfilePic:girlProfilePic
        })
        if(newUser){
            console.log(newUser)
           await generateTokenandSetCookie(newUser._id,res)
            await newUser.save()
         return res.status(201).json({
            message:"User successfully created",
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
        
        }
        else{
             return res.status(400).json({error:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller",error.message)
        return res.status(500).json({error:"Internal server error"})
        
    }
}
export const loginUser = async(req,res)=>{
    try {
        const {username,password} = req.body
        // console.log(username)
        const user = await User.findOne({username})
        const isPassWordCorrect = await bcrypt.compare(password,user?.password||"")
        if(!user || !isPassWordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        let userId = user._id;

        // generateTokenandSetCookie(user._id,res);
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})
        // console.log("My Token",token)
        const options={
            httpOnly:false,
            maxAge:15*24*60*60*1000,
            domain:" http://localhost:5173/",
            sameSite: 'None',
            secure:false
        }
        // req.session.token = token
        // res.cookie('jwt',token,options);
        return res.json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
            token
        })
        .status(200)
    } catch (error) {
        console.log("Error in login controller",error.message)
        return res.status(500).json({error:"Internal server error"})
        
    }
    

}

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0,sameSite: 'None',secure:false,httpOnly:false})
        return res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller",error.message)
        return res.status(500).json({error:"Internal server error"})
        
    }
    
}

