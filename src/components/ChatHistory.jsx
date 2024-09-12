import React from 'react'
import IndividualChatHistory from './IndividualChatHistory'
import { useBearStore } from '../store/store'
import axios from "axios";

const ChatHistory = ({documents}) => {

  const currentDocument = useBearStore((state) => state.currentDocument);
  const setCurrentDocument = useBearStore((state) => state.setCurrentDocument);
  const setChatMessages = useBearStore((state) => state.setChatMessages);

  console.log("Current document:", currentDocument);
  const handleDocumentClick = (document) => {
    console.log("Clicked document:", document)
    setCurrentDocument(document);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/chat`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("secret")}`,
        },
      })
      .then((response) => {
        
      })
      .catch((error) => {
        setChatMessages([
          {
            id: 1,
            'response': 'AI response hereeee',
            'query': 'User query here'
          },
          {
            id: 2,
            'response': 'AI response hereeee',
            'query': 'User query here'
          },
        ])
      });
  };

  return (
    <button className='ml-6 min-h-[65vh] max-h-[65vh] flex-col min-w-[80%] justify-center items-center overflow-y-scroll py-3'>
      {
        documents ? documents.map((document, index) => {
          return <IndividualChatHistory key={document.id} document={document} onClick={() => handleDocumentClick(document)}/>
        }) : null
      }
    </button>
  )
}

export default ChatHistory
