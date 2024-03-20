import React from 'react'
import userProfile from '../assets/user-profile.jpeg';

const UserChatBubble = () => {
  return (
    <div className='mt-6 w-[100%] flex gap-3'>
        <div className='h-max w-max min-w-auto'>
            <img src={userProfile} alt="" className='h-8 min-w-8 rounded-full'/>
        </div>
        <div className='flex flex-col'>
            <div className='font-bold'>Username</div>
            <p className='mt-1 text-[0.85rem]'> Lorem inpsumaskjdhfkjasdhfkjah asdj fhasjd f asdfjhlaskdh fs ad fas df as  hasdh fkasjdhfska dfasld fsal df Lorem inpsumaskjdhfkjasdhfkjah asdj fhasjd f asdfjhlaskdh fs ad fas df as  hasdh fkasjdhfska dfasld fsal dfLorem inpsumaskjdhfkjasdhfkjah asdj fhasjd f asdfjhlaskdh fs ad fas df as  hasdh fkasjdhfska dfasld fsal dfLorem inpsumaskjdhfkjasdhfkjah asdj fhasjd f asdfjhlaskdh fs ad fas df as  hasdh fkasjdhfska dfasld fsal df</p>
        </div>
      
    </div>
  )
}

export default UserChatBubble
