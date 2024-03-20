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
    }
}))

export {
    useBearStore
}