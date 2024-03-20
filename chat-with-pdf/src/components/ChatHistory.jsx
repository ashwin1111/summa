import React from 'react'
import IndividualChatHistory from './IndividualChatHistory'

const ChatHistory = ({documents}) => {
  return (
    <div className='ml-6 flex-col justify-center items-center'>
      {
        documents ? documents.map((document, index) => {
          return <IndividualChatHistory text={document.name} active={index === 0 ? true : false}/>
        }) : null
      }
    </div>
  )
}

export default ChatHistory
