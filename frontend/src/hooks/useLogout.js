import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogout= ()=>{
    const [loading,setLoading] = useState(false)
    const {setAuthUser} =useAuthContext()
    const logout=async()=>{
        setLoading(true)
        try {
          const res = await fetch("http://localhost:3000/api/auth/logout",{
            method:"GET",
            headers:{"Content-Type":"application/json"},credentials: 'include'
          });
          const data = await res.json()
          if(data.error){
            throw new Error(data.error)
          }

          localStorage.removeItem("chat-user");
          sessionStorage.removeItem("jwt")
          setAuthUser(null)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
            
        }
        finally{
            setLoading(false)
        }

    }

    return {loading,logout}
}
export default useLogout
