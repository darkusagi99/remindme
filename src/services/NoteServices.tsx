import { getDocs, collection } from "firebase/firestore";
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