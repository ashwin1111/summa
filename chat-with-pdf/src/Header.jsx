import React from 'react'
import logo from './assets/logo.svg'

const Header = () => {
  return (
    <div className='min-h-[3rem] min-w-[100vw] flex justify-between md:justify-center md:items-center pb-4'>
      <div className='mt-4'>
        <img src={logo} alt="" sizes={5}/>
      </div>
        <div className='md:absolute md:right-0 md:mr-10'>
            <button className='border-2 border-black rounded-2xl min-h-[3rem] px-3 font-bold'>Login</button>
        </div>
    </div>
  )
}

export default Header
