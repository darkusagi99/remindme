import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {auth, db} from "./firebase";
import FeedProps from "../types/feed-props";

const collection_name = "feed-settings";

async function getUserCollection() {
    const userUuid = auth.currentUser?.uid;
    console.log("userUuid : " + userUuid);
    return "user/" + userUuid + "/" + collection_name;
}

export const findAllSettings = async () => {
    const res: FeedProps[] = []
    const userCollection = await getUserCollection();
    const doc_refs = await getDocs(collection(db, userCollection))

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, url : currEntry.data().url, lastUpdate : new Date(currEntry.data().lastUpdate.seconds * 1000)});
    })

    return res
}

export const findAllSettingsRef = async () => {
    const userCollection = await getUserCollection();
    return getDocs(collection(db, userCollection))
}

export const addSetting = async (newUrl : string) => {

    const defaultDate = new Date("1900-01-01");
    const userCollection = await getUserCollection();
    await addDoc(collection(db, userCollection), {url: newUrl, lastUpdate: defaultDate});
    return;
}

export const updateLastupdateSetting = async (settingId : string, newDate : Date) => {
    const userCollection = await getUserCollection();
    await updateDoc(doc(db, userCollection, settingId), {lastUpdate: newDate});
}

export const deleteSetting = async (feedToDelete : FeedProps) => {
    const userCollection = await getUserCollection();
    await deleteDoc(doc(db, userCollection, feedToDelete.id));
}