import React from 'react'
import IndividualChatHistory from './IndividualChatHistory'

const ChatHistory = () => {
  return (
    <div className='ml-8 flex-col justify-center items-center'>
        <IndividualChatHistory text="hello one" active={true} />
        <IndividualChatHistory text="hello two" active={false}/>
        <IndividualChatHistory text="hello three" active={false}/>
        <IndividualChatHistory text="hello four" active={false}/>
        <IndividualChatHistory text="hello five" active={false}/>
    </div>
  )
}

export default ChatHistory
