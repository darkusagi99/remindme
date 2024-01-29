import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {db} from "./firebase";
import FeedProps from "../types/feed-props";

const collection_name = "feed-settings"

export const findAllSettings = async () => {

    const doc_refs = await getDocs(collection(db, collection_name))

    const res: FeedProps[] = []

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, url : currEntry.data().url, lastUpdate : new Date(currEntry.data().lastUpdate.seconds * 1000)});
    })

    console.log(res);

    return res
}

export const addSetting = async (newSetting : FeedProps) => {

    const defaultDate = new Date("1900-01-01");
    const docRef = await addDoc(collection(db, collection_name), {url: newSetting.url, lastUpdate: defaultDate});
    return;
}

export const deleteSetting = async (feedToDelete : FeedProps) => {

    const docRef = await deleteDoc(doc(db, collection_name, feedToDelete.id));

}