import React from 'react'
import Search from './components/Search'
import userProfile from './assets/user-profile.jpeg'
import ChatHistory from './components/ChatHistory'
import ChatSection from './components/ChatSection'

const Dashboard = () => {
  return (
    <div className='min-h-[100vh] min-w-[100vw] max-h-[100vh] max-w-[100vw] bg-[#f7f8fa] flex'>
      <div className='side-tab absolute left-0 min-h-[100vh] min-w-[20vw]'>
        <div className='mt-[5vh] flex justify-start items-center gap-6 ml-10'>
            <img src={userProfile} alt="" className='h-12 w-auto rounded-full'/>
            <p>Username</p>
        </div>
        <div className='mt-5 flex justify-center mb-16'>
            <Search/>
        </div>
        <ChatHistory/>
      </div>
      <div className='min-h-[100vh] min-w-[20vw]'></div>
      <div className='h-[100vh] flex items-center'>
            <ChatSection/>
      </div>
    </div>
  )
}

export default Dashboard
