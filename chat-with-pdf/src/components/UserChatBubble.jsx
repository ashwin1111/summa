import React from 'react'
import userProfile from '../assets/user-profile.jpeg';

const UserChatBubble = ({text}) => {
  const username = localStorage.getItem('username');
  return (
    <div className='mt-6 w-[100%] flex gap-3 justify-start'>
        <div className='h-max w-max min-w-auto'>
            <img src={userProfile} alt="" className='h-8 min-w-8 rounded-full'/>
        </div>
        <div className='flex flex-col'>
            <div className='font-bold'>{username}</div>
            <p className='mt-1 text-[0.85rem]'>{text}</p>
        </div>
      
    </div>
  )
}

export default UserChatBubble
