import React from 'react'
import IndividualChatHistory from './IndividualChatHistory'
import { useBearStore } from '../store/store'

const ChatHistory = ({documents}) => {

  const currentDocument = useBearStore((state) => state.currentDocument);

  const setCurrentDocument = useBearStore((state) => state.setCurrentDocument);
  console.log("Current document:", currentDocument);
  const handleDocumentClick = (document) => {
    console.log("Clicked document:", document)
    setCurrentDocument(document);
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
