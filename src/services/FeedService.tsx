import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {db} from "./firebase";
import FeedEntryProps from "../types/feed-entry-props";

const collection_name = "feed-entry"

export const findAllEntries = async () => {

    const doc_refs = await getDocs(collection(db, collection_name))

    const res: FeedEntryProps[] = []

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, url : currEntry.data().url, title : currEntry.data().title, publicationDate : currEntry.data().publicationDate, description : currEntry.data().description, imageLink : currEntry.data().imageLink });
    })

    return res;
}

export const addEntry = async (newNote : FeedEntryProps) => {

    const defaultDate = new Date("1900-01-01");
    const docRef = await addDoc(collection(db, collection_name), {title: newNote.title});
    return;
}

export const deleteEntry = async (feedEntryToDelete : FeedEntryProps) => {

    const docRef = await deleteDoc(doc(db, collection_name, feedEntryToDelete.id));

}