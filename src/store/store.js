import {
    create
} from 'zustand'

const useBearStore = create((set) => ({
    documents: [],
    setDocuments: (newDocuments) => {
        console.log("Updating documents:", newDocuments);
        set({
            documents: newDocuments
        })
    },
    currentDocument: null,
    setCurrentDocument: (document) => {
        console.log("Setting current document:", document);
        set({
            currentDocument: document
        })
    },
    loadingGlobal: false,
    setLoadingGlobal: (loading) => {
        set({
            loadingGlobal: loading
        })
    },

    chatLoading: false,
    setChatLoading: (loading) => {
        set({
            chatLoading: loading
        })
    },

    chatMessages: [],
    setChatMessages: (newMessages) => {
        console.log("Updating chat messages:", newMessages);
        set(() => ({    
            chatMessages: newMessages
        }))
    },

    chatNewMessage: [],
    setChatNewMessage: (newMessage) => {
        console.log("Updating chat new message:", newMessage);
        set(() => ({    
            chatNewMessage: newMessage
        }))
    },
}))

export {
    useBearStore
}