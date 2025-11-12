import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';


const useSendMessage = () => {
    const [loading,setLoading] = useState(false)
    const {messages,setMessages,selectedConversation} = useConversation()
    const sendMessage = async(message)=>{
        setLoading(true)
        const token_VAL = sessionStorage.getItem('jwt')
        try {
            const res = await fetch(`http://localhost:3000/api/messages/send/${selectedConversation._id}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({message,token:token_VAL})

            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            setMessages([...messages,data.newMessage]);
            
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }

    }
    return {sendMessage,loading}
  
}

export default useSendMessage
