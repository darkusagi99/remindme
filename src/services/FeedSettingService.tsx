import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {auth, db} from "./firebase";
import FeedProps from "../types/feed-props";
import NoteProps from "../types/note-props";
import {addInCache, getInCache, removeFromCache, saveInCache} from "./CacheService";

const collection_name = "feed-settings";
const collection_name_local = collection_name + "-";

async function getUserCollection() {
    const userUuid = auth.currentUser?.uid;
    return "user/" + userUuid + "/" + collection_name;
}

export const findAllSettings = async () => {
    let res: FeedProps[];
    const localCache = loadFromCache();

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

    console.log("Load settings from Cloud")

    const res: FeedProps[] = []
    const userCollection = await getUserCollection();
    const doc_refs = await getDocs(collection(db, userCollection))

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, url : currEntry.data().url, lastUpdate : new Date(currEntry.data().lastUpdate.seconds * 1000)});
    })

    return res

}

function loadFromCache() {
    console.log("Load settings from Cache")
    const res: FeedProps[] = []

    for(let i = 0; i < localStorage.length; i++) {
        let currentKey = localStorage.key(i);
        if (currentKey != null && currentKey.startsWith(collection_name_local)) {
            let tmpItem = localStorage.getItem(currentKey);
            if (tmpItem != null) {
                res.push(JSON.parse(tmpItem));
            }
        }
    }

    return res;
}

export const findAllSettingsRef = async () => {
    const userCollection = await getUserCollection();
    return getDocs(collection(db, userCollection))
}

export const addSetting = async (newUrl : string) => {

    const defaultDate = new Date("1900-01-01");
    const userCollection = await getUserCollection();
    await addDoc(collection(db, userCollection), {url: newUrl, lastUpdate: defaultDate}).then(
        (docref) => {
            addInCache(collection_name_local + docref.id, {id : docref.id, url: newUrl, lastUpdate: defaultDate});
        }
    );
    return;
}

export const updateLastupdateSetting = async (settingId : string, newDate : Date) => {
    const userCollection = await getUserCollection();
    await updateDoc(doc(db, userCollection, settingId), {lastUpdate: newDate}).then(
        () => {
            let tmpVal = JSON.parse(getInCache(collection_name_local + settingId));
            addInCache(collection_name_local + settingId, {id : settingId, url: tmpVal.url, newDate});
        }
    );
}

export const deleteSetting = async (feedToDelete : FeedProps) => {
    const userCollection = await getUserCollection();
    await deleteDoc(doc(db, userCollection, feedToDelete.id)).then(() => removeFromCache(collection_name_local + feedToDelete.id));
}