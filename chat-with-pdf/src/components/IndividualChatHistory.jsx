import React from 'react'
import document from '../assets/document.svg'
import { useBearStore } from '../store/store'

const IndividualChatHistory = ({document, onClick}) => {

  const currentDocument = useBearStore((state) => state.currentDocument);

  return (
    <div className={`my-2 py-3 px-2 flex ${currentDocument?.id === document.id ? "bg-white border-2 shadow-md rounded-xl":""} h-max min-w-[90%]`} onClick={onClick}>
        <img src={document} alt="" className='h-6'/>
        <p className='ml-3 text-[0.9rem] overflow-hidden whitespace-nowrap max-w-[60vw] md:max-w-[12vw]'
            style={{ textOverflow: "ellipsis" }}>{document.name}</p>
    </div>
  )
}

export default IndividualChatHistory
