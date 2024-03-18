import React from 'react'

const Dashboard = () => {
  return (
    <div className='min-h-[100vh] min-w-[100vw] max-h-[100vh] max-w-[100vw] bg-[#f7f8fa] flex'>
      <div className='side-tab absolute left-0 min-h-[100vh] min-w-[20vw]'>
        <div className='mt-[5vh] flex justify-start ml-10'>
            <img src="" alt="" />
            <p>Username</p>
        </div>
        <div className='mt-3 flex justify-center'>
            <input className='p-3 rounded-lg' type="text" placeholder='Search for chats...'/>
        </div>
      </div>
      <div className='min-h-[100vh] min-w-[20vw]'></div>
      <div className='h-[100vh] flex items-center'>
        <div className='chat-section min-h-[95vh] border-2 max-h-[95vh] min-w-[78vw] max-w-[78vw] bg-white shadow-sm rounded-3xl'>
        
        </div>
      </div>
    </div>
  )
}

export default Dashboard
