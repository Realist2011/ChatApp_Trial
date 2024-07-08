import React from 'react'

const Conversation = ({conversation,lastIdx,emoji}) => {
  return (
    <>
    <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt='user avatar'></img></div></div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                    <span className='text-xl'>{emoji}</span>
                    </div>
                   
                    </div>
                </div>
                {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
                
    </>
  )
}

export default Conversation