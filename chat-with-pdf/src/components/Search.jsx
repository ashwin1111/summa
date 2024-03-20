import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { Input, Button } from 'antd'
import { useState } from 'react'
import { useBearStore } from '../store/store'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'

const Search = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const setDocuments = useBearStore((state) => state.setDocuments); // From your global state store
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocumentsBySearch = async (searchTerm) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/documents/${user_id}?search_term=${searchTerm}`);
      setDocuments(response.data.documents); 
    } catch (error) {
      console.error("Error searching documents:", error);
      // Handle the error appropriately 
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchDocumentsBySearch(searchTerm);
  };

  return (
    <div className='max-w-[80%] min-w-[80%]'>
    <Input 
        className='flex-1 outline-none text-[0.8rem]' 
        type="text" 
        placeholder='Search for chats...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        suffix={ // Add the suffix 
            <Button type="text" className='p-2' icon={isLoading ? <LoadingOutlined color='white' style={{color:'white'}} /> : <IoSearchOutline color="white" fontWeight={600} />} style={{backgroundColor:'#0fa958', fontWeight:'bold'}}  onClick={handleSearch}/>
        }
    />
</div>
  )
}

export default Search
