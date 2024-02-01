import { getDocs, collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import {auth, db} from "./firebase";
import NoteProps from "../types/note-props";

const collection_name = "notes"
const userCollection = "user/" + auth.currentUser?.uid + "/" + collection_name;

export const findAllNotes = async () => {

    const doc_refs = await getDocs(collection(db, userCollection))

    const res: NoteProps[] = []

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, title : currEntry.data().title, content : currEntry.data().content});
    })

    return res
}

export const createOrUpdateNote = async (newNote : NoteProps) => {
    if(newNote.id === "") {
        await addDoc(collection(db, userCollection), {title: newNote.title, content: newNote.content});
    } else {
        await setDoc(doc(db, userCollection, newNote.id), {title: newNote.title, content: newNote.content});
    }
}

export const deleteNote = async (noteToDelete : NoteProps) => {
    await deleteDoc(doc(db, userCollection, noteToDelete.id));
}