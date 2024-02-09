import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {auth, db} from "./firebase";
import FeedEntryProps from "../types/feed-entry-props";
import {findAllSettingsRef} from "./FeedSettingService";

const collection_name = "feed-entry";

async function getUserCollection() {
    const userUuid = auth.currentUser?.uid;
    return "user/" + userUuid + "/" + collection_name;
}
export const findAllEntries = async () => {

    const userCollection = await getUserCollection();
    const doc_refs = await getDocs(collection(db, userCollection))

    const res: FeedEntryProps[] = []

    doc_refs.forEach(currEntry => {
        res.push({id : currEntry.id, url : currEntry.data().url, title : currEntry.data().title, publicationDate : currEntry.data().publicationDate, description : currEntry.data().description, imageLink : currEntry.data().imageLink });
    })

    return res;
}

export const addEntry = async (newNote : FeedEntryProps) => {
    const userCollection = await getUserCollection();
    //const defaultDate = new Date("1900-01-01");
    await addDoc(collection(db, userCollection), {title: newNote.title});
    return;
}

export const deleteEntry = async (feedEntryToDelete : FeedEntryProps) => {
    const userCollection = await getUserCollection();
    await deleteDoc(doc(db, userCollection, feedEntryToDelete.id));
}

export const updateAllFeeds = async () => {
    // Update all Feeds function

    // Load all feeds
    const doc_refs = await findAllSettingsRef();
    const corsProxy : string = 'https://corsproxy.io/?'

    //let parser = new RSSParser();

    // For each, get feed entry
    doc_refs.forEach(currEntry => {

        let feedUrl = corsProxy + currEntry.data().url;

        // Get feed entries
        fetch(feedUrl, {mode:'cors'
        })
            // Read body of response
            .then(response => response.text())
            // Transform body to XML Document object
            .then(data => {let parser = new DOMParser()
                    let xmlDoc = parser.parseFromString(data, 'text/xml')
                    console.log(xmlDoc)
                    return xmlDoc;
            }
            )
            // Collect XML elements from feed
            .then((xmlDocument) => {
                    let returnList;
                    let returnListStd = xmlDocument.getElementsByTagName("item");
                    let returnListEntry = xmlDocument.getElementsByTagName("entry");

                    returnList = Array.from(returnListStd);
                    returnList.concat(Array.from(returnListEntry));
                    return returnList;
                }
            )
            // Loop on entries
            .then((feedEntries) =>
                feedEntries.forEach(
                    currEntry =>
                        createEntryFromElement(currEntry)
                )
            );
            //.then(data => console.log(data));

        // Loop inside Feed entries and create new entries

        // Update entry in DB

        // If field updated proprely, update last update date

    })

}

function getFirstTagContent(element : Element, tag : string) : string {
    let tagList = element.getElementsByTagName(tag);
    if (tagList.length > 0) {
        if (tagList.item(0) != null) {
            return tagList.item(0)!.innerHTML;
        }
    }
    // If nothing found - return empty element
    return "";
}

export const createEntryFromElement = (element : Element) => {

        let tmpId = getFirstTagContent(element, "link");
        let tmpUrl = getFirstTagContent(element, "link");
        let tmpTitle = getFirstTagContent(element, "title");
        let tmppubDate = getFirstTagContent(element, "pubDate");
        let tmpDescription = getFirstTagContent(element, "description");

        let tmpDescriptionBis = getFirstTagContent(element, "description");
        let tmpImage = getFirstTagContent(element, "enclosure");

        let feedEntry : FeedEntryProps = {
        id : tmpId,
        url : tmpUrl,
        title : tmpTitle,
        publicationDate : new Date(),
        description : tmpDescription + tmpDescriptionBis,
        imageLink : tmpImage
        //imageFile :
        }

        console.log(feedEntry);

}
