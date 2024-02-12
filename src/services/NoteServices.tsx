import { getDocs, collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import {auth, db} from "./firebase";
import NoteProps from "../types/note-props";
import {saveInCache, removeFromCache, addInCache, loadFromCache} from "./CacheService";

const collection_name = "notes";
const collection_name_local = collection_name + "-";

async function getUserCollection() {
    const userUuid = auth.currentUser?.uid;
    return "user/" + userUuid + "/" + collection_name;
}

export const findAllNotes = async () => {

    let res: NoteProps[];
    const localCache = loadFromCache(collection_name_local);

    // No local cache -> Check Cloud
    if (localCache.length === 0) {
        res = await loadFromCloud();
        saveInCache(res, collection_name_local);
    } else {
        // Local cache -> serve as return.
        res =  localCache;
    }

    return res;
}


async function loadFromCloud() {

    const userCollection = await getUserCollection();
    const doc_refs = await getDocs(collection(db, userCollection));

    const res: NoteProps[] = [];

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, title : currEntry.data().title, content : currEntry.data().content});
    })

    return res

}


export const createOrUpdateNote = async (newNote : NoteProps) => {
    const userCollection = await getUserCollection();
    if(newNote.id === "") {
        await addDoc(collection(db, userCollection), {title: newNote.title, content: newNote.content}).then((docref) =>
            {
                newNote.id = docref.id;
                addInCache(collection_name_local + docref.id, newNote);
            }
        );
    } else {
        await setDoc(doc(db, userCollection, newNote.id), {title: newNote.title, content: newNote.content}).then(() =>
            addInCache(collection_name_local + newNote.id, newNote)
        );
    }
}

export const deleteNote = async (noteToDelete : NoteProps) => {
    const userCollection = await getUserCollection();
    await deleteDoc(doc(db, userCollection, noteToDelete.id)).then(() => removeFromCache(collection_name_local + noteToDelete.id));
}