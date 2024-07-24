import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
// import { Cookie } from 'express-session'


const useLogin = () => {
  const [loading,setLoading]= useState(false)
  const {setAuthUser}=useAuthContext()
  const login = async(username,password)=>{
    console.log(username,password);
    const success = handleInputErrors(username,password)
    if(!success) return 
    setLoading(true)
    try {
        const res = await fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},credentials: 'same-origin',
            credentials: "include",
            body:JSON.stringify({username,password})
        })
        // console.log("oye bkl",res.cookie)
        // console.log("2",res.headers.getSetCookie())
        const data = await res.json();
        console.log("DATA",data.token)
        sessionStorage.setItem("jwt",JSON.stringify(data.token))
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.setItem("chat-user",JSON.stringify(data))
        // localStorage.setItem("jwt",JSON.stringify(data.token))
        // Cookie("jwt",data.token)
        setAuthUser(data)
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
    finally{
        setLoading(false)
    }
    
  }
  return {loading,login}
}

export default useLogin


function handleInputErrors({username,password}){
    // if( !username || !password ){
    //     toast.error("PLease fill in all fields")
    //     return false
    // }
    // if(password!= confirmPassword){
    //     toast.error("Passwords don't match")
    //     return false
    // }
    // if(password.length<6){
    //     toast.error("Password must be atleast 6 characters")
    //     return false 
    // }

    return true
}