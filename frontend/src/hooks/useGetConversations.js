import React, { useEffect,useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading,setLoading] = useState(false); 
   const token_VAL = sessionStorage.getItem('jwt')
  const [conversations,setConversations]=useState([]);
  useEffect(()=>{
    const getConversations = async()=>{
      setLoading(true)
      try {
        const res = await fetch('http://localhost:3000/api/users',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          credentials: 'include',
          body:JSON.stringify({token:token_VAL})
        });
        const data = await res.json();
        if(data.error){
          throw new Error(data.error)}
        setConversations(data)
      } catch (error) {
        toast.error(error.message)
        console.log(error)
        
      }
      finally{
        setLoading(false)
      }
    }
    getConversations()
  },[])

  return {loading,conversations}
}

export default useGetConversations
