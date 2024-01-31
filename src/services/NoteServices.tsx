import { getDocs, collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import {db} from "./firebase";
import NoteProps from "../types/note-props";

const collection_name = "notes"

export const findAllNotes = async () => {

    const doc_refs = await getDocs(collection(db, collection_name))

    const res: NoteProps[] = []

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, title : currEntry.data().title, content : currEntry.data().content});
    })

    return res
}

export const createOrUpdateNote = async (newNote : NoteProps) => {

    if(newNote.id === "") {
        const docRef = await addDoc(collection(db, collection_name), {title: newNote.title, content: newNote.content});
    } else {
        const docRef = await setDoc(doc(db, collection_name, newNote.id), {title: newNote.title, content: newNote.content});
    }
    return;
}

export const deleteNote = async (noteToDelete : NoteProps) => {

    const docRef = await deleteDoc(doc(db, collection_name, noteToDelete.id));

}