import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'

const Conversations = () => {
  const {loading,conversations} = useGetConversations()
  return (
    <div>
        <div className='py-2 flex flex-col overflow-auto'>
            {/* <Conversation/> */}
            {conversations.map((conversation,idx)=>{
              <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx===conversations.length-1}/>
            })}
            {loading ?<span className='loading loading-spinner max-auto'></span>:null}
        </div>
    </div>
  )
}

export default Conversations