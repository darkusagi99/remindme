import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {auth, db} from "./firebase";
import FeedProps from "../types/feed-props";

const collection_name = "feed-settings";
const userCollection = "user/" + auth.currentUser?.uid + "/" + collection_name;

export const findAllSettings = async () => {
    const res: FeedProps[] = []
    const doc_refs = await getDocs(collection(db, userCollection))

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, url : currEntry.data().url, lastUpdate : new Date(currEntry.data().lastUpdate.seconds * 1000)});
    })

    return res
}

export const findAllSettingsRef = async () => {
    return getDocs(collection(db, userCollection))
}

export const addSetting = async (newUrl : string) => {

    const defaultDate = new Date("1900-01-01");
    await addDoc(collection(db, userCollection), {url: newUrl, lastUpdate: defaultDate});
    return;
}

export const updateLastupdateSetting = async (settingId : string, newDate : Date) => {
    await updateDoc(doc(db, userCollection, settingId), {lastUpdate: newDate});
}

export const deleteSetting = async (feedToDelete : FeedProps) => {
    await deleteDoc(doc(db, userCollection, feedToDelete.id));
}