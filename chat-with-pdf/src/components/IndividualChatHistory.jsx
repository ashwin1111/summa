import React from 'react'
import document from '../assets/document.svg'

const IndividualChatHistory = ({text, active}) => {
  return (
    <div className={`py-4 px-2 flex ${active ? "bg-white border-2 shadow-md rounded-xl":""} h-max w-[90%]`}>
        <img src={document} alt="" className='h-6'/>
        <p className='ml-3' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</p>
    </div>
  )
}

export default IndividualChatHistory
