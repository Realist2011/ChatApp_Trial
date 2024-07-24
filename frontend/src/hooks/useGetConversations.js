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
       
        console.log("tOKEN YAHAN HAI BC",token_VAL)
        const res = await fetch('http://localhost:3000/api/users',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          credentials: 'include',
          body:JSON.stringify({token:token_VAL})
        });
        console.log("1",res.headers.getSetCookie())
        const data = await res.json();
        console.log(data)
        
        if(data.error){
          console.log(data)
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