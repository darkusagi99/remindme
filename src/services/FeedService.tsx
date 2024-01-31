import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {db} from "./firebase";
import FeedEntryProps from "../types/feed-entry-props";

const collection_name = "feed-entry";
const collection_settings_name = "feed-settings";

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

export const updateAllFeeds = async () => {
    // Update all Feeds function

    // Load all feeds
    const doc_refs = await getDocs(collection(db, collection_settings_name));

    // For each, get feed entry
    doc_refs.forEach(currEntry => {
        console.log(currEntry.data().url);

        var rssData;

        // Get feed entry
        fetch('/api/' + currEntry.data().url, {mode:'no-cors',
            headers : {
                'Accept' :'application/xml',
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then(response => console.log(response));
        ;
            //.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            //.then(data => console.log(data));

        // Loop inside Feed entries and create new entries

        // Update entry in DB

        // If field updated proprely, update last update date

    })

}