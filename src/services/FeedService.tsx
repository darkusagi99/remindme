import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {auth, db} from "./firebase";
import FeedEntryProps from "../types/feed-entry-props";
import {findAllSettingsRef, updateLastupdateSetting} from "./FeedSettingService";


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
    await addDoc(collection(db, userCollection), newNote);
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
    let lastUpdateDate : Date;
    let dateZero : Date = new Date(0);
    let maxPubDate : Date;

    //let parser = new RSSParser();

    // For each, get feed entry
    doc_refs.forEach(currEntry => {

        let feedUrl = corsProxy + currEntry.data().url;

        // Init Date and ID Vars
        lastUpdateDate = new Date(currEntry.data().lastUpdate);
        maxPubDate = new Date(0);
        let currentFeedSettingId = currEntry.id;

        console.log(currentFeedSettingId + " -- " + lastUpdateDate);

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
                    let returnListStd = xmlDocument.getElementsByTagName("item");
                    let returnListEntry = xmlDocument.getElementsByTagName("entry");

                    if (returnListStd.length === 0) {
                        return Array.from(returnListEntry);
                    } else {
                        return Array.from(returnListStd);

                    }
                }
            )
            // Loop on entries
            .then((feedEntries) =>
                feedEntries.forEach(
                    currEntry => {
                        // Extract element
                        let extractedEntry = createEntryFromElement(currEntry);

                        // Check element Date
                        if (extractedEntry.publicationDate === dateZero || extractedEntry.publicationDate > lastUpdateDate) {
                            // Element to keep, else should be skipped
                            // Update last update date
                            if (extractedEntry.publicationDate > maxPubDate) {
                                maxPubDate = extractedEntry.publicationDate;
                            }

                            // Save element
                            addEntry(extractedEntry);

                        }
                    }
                )
            ).then(() => {
                // Update feed date if necessary
                if (lastUpdateDate < maxPubDate) {
                    updateLastupdateSetting(currentFeedSettingId, maxPubDate);
                }
            }
        );


    })

}

function getFirstTagContent(element : Element, tag : string) : string {
    let searchedTag = element.querySelector(tag); //element.getElementsByTagName(tag);
    if (searchedTag != null) {
            return searchedTag.textContent ?? "";
    }
    // If nothing found - return empty element
    return "";
}

function getFirstTagArgument(element : Element, tag : string, arg : string) : string {
    let searchedTag = element.querySelector(tag); //element.getElementsByTagName(tag);
    if (searchedTag != null) {
        let attrElement = searchedTag.attributes.getNamedItem(arg);
        if (attrElement != null) {
            return attrElement.value;
        }
    }
    // If nothing found - return empty element
    return "";
}

export const createEntryFromElement = (element : Element) : FeedEntryProps => {

    // Extract ID and URL
    let tmpUrl = getFirstTagContent(element, "link");
    if (tmpUrl === "") {
        tmpUrl = getFirstTagArgument(element, "link", "href");
    }

    // Extract title
    let tmpTitle = getFirstTagContent(element, "title");

    // Extract Date
    let tmpPubDate = new Date(getFirstTagContent(element, "pubDate"));
    if (isNaN(tmpPubDate.getTime())) {
        tmpPubDate = new Date(getFirstTagContent(element, "published"));
        if (isNaN(tmpPubDate.getTime())) {
            tmpPubDate = new Date(0);
        }
    }

    // GetDescription content
    let tmpDescription = getFirstTagContent(element, "description");
    if(tmpDescription === "") {
        tmpDescription = getFirstTagContent(element, "content");
    }

    // Get image
    let tmpImage = getFirstTagArgument(element, "enclosure", "url");
    if (tmpImage === "") {
        tmpImage = getFirstTagArgument(element, "content", "url");
    }

    // Return extracted entryProps
    return {
        id : tmpUrl,
        url : tmpUrl,
        title : tmpTitle,
        publicationDate : tmpPubDate,
        description : tmpDescription,
        imageLink : tmpImage
    };


}
