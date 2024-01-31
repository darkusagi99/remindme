import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {deleteEntry, findAllEntries, updateAllFeeds} from "../services/FeedService";
import FeedEntryProps from "../types/feed-entry-props";
import {createOrUpdateNote} from "../services/NoteServices";
import {DeleteIcon, LinkIcon, RefreshIcon, SaveIcon} from "../common/Icons";

/** Component for FeedList - v9 version */
export default  function FeedList() {

    const [feedList , setFeedList] = useState<FeedEntryProps[]>([]);

    async function refreshSettings() {
        const entriesList = await findAllEntries().then();
        setFeedList(entriesList);
        return;
    }

    useEffect(() => {
        refreshSettings();
    }, [])

    function refreshFeedList() {
        updateAllFeeds();
        return;
    }

    function deleteEntryAndRefresh(settingToDelete: FeedEntryProps) {
        deleteEntry(settingToDelete);
        refreshSettings();
        return;
    }

    function saveAsNote(entryToSave: FeedEntryProps) {
        createOrUpdateNote({id: "", title : entryToSave.title, content : entryToSave.url});
        refreshSettings();
        return;
    }

    function openInBrowser(currentFeedEntry: FeedEntryProps) {
        window.open(currentFeedEntry.url, "_blank", "noreferrer")
        return;
    }

    /** Component display */
    return (
        <div>
            <NavBar/>

            <div className="d-flex flex-row-reverse bd-highlight p-1">
                <button type="button" className="btn btn btn-outline-primary" onClick={() => refreshFeedList()}>
                    <RefreshIcon />
                </button>
            </div>

            <div className="d-flex flex-column justify-content-center gap-3 px-1 mt-3"> { /* List element DIV */}
                {
                    feedList.map(currentEntry => (
                        <div className="card" key={currentEntry.id}>
                            <div className="card-body">
                                <h5 className="card-title">{currentEntry.title}</h5>
                                <p className="card-text">{currentEntry.description}</p>
                            </div>
                                <div className="card-footer">
                                    <div className="d-flex  bd-highlight justify-content-between">
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-primary"
                                                    onClick={() => openInBrowser(currentEntry)}>
                                                <LinkIcon />
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-primary"
                                                    onClick={() => saveAsNote(currentEntry)}>
                                                <SaveIcon />
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-danger"
                                                    onClick={() => deleteEntryAndRefresh(currentEntry)}>
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        )
                    )
                }
            </div>
        </div>
    )
}
