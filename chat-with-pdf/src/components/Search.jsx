import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const Search = () => {
  return (
    <div className='flex p-3 rounded-lg bg-white justify-center items-center gap-4 border-1 shadow-lg w-[80%]'>
      <IoSearchOutline color='#666f8d'/>
    <input className='outline-none' type="text" placeholder='Search for chats...'/>
    </div>
  )
}

export default Search
