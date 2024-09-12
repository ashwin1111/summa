import React from 'react'
import documentImage from '../assets/document.svg'
import { useBearStore } from '../store/store'

const IndividualChatHistory = ({document, onClick}) => {

  // const currentDocument = useBearStore((state) => state.currentDocument);

  return (
    <div className={`my-2 py-3 px-2 flex  bg-white border-2 shadow-md rounded-xl h-max min-w-[90%]`} onClick={onClick}>
        <p className='ml-3 text-[0.9rem] overflow-hidden whitespace-nowrap max-w-[60vw] md:max-w-[12vw]'
            style={{ textOverflow: "ellipsis" }}>{document.title}</p>
    </div>
  )
}

export default IndividualChatHistory
