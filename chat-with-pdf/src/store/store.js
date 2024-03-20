import {
    create
} from 'zustand'

const useBearStore = create((set) => ({
    documents: [],
    documentChosen
    setDocuments: (newDocuments) => {
        console.log("Updating documents:", newDocuments);
        set({
            documents: newDocuments
        })
    }
}))

export {
    useBearStore
}