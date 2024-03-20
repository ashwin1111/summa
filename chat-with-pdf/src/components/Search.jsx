import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const Search = () => {
  return (
    <div className='flex p-3 rounded-lg bg-white justify-center items-center gap-4 border-2 w-[80%] overflow-hidden'>
      <IoSearchOutline color='#666f8d'/>
    <input className='outline-none text-[0.8rem] flex justify-start' type="text" placeholder='Search for chats...'/>
    </div>
  )
}

export default Search
