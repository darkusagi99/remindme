import React, {Component, useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {format} from "date-fns";
import {findAllEntries} from "../services/FeedService";
import FeedEntryProps from "../types/feed-entry-props";

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
        const defaultDate = new Date("1900-01-01");
        //addSetting({id: "", url: "new URL", lastUpdate : defaultDate});
        refreshSettings();
        return;
    }

    function deleteEntryAndRefresh(settingToDelete: FeedEntryProps) {
        //deleteSetting(settingToDelete);
        refreshSettings();
        return;
    }

    function saveAsNote(settingToDelete: FeedEntryProps) {
        //deleteSetting(settingToDelete);
        refreshSettings();
        return;
    }

    function openInBrowser(settingToDelete: FeedEntryProps) {
        //deleteSetting(settingToDelete);
        refreshSettings();
        return;
    }

    /** Component display */
    return (
        <div>
            <NavBar/>

            <div className="d-flex flex-row-reverse bd-highlight p-1">
                <button type="button" className="btn btn btn-outline-primary" onClick={() => refreshFeedList()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path
                            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                        <path fill-rule="evenodd"
                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                    </svg>
                </button>
            </div>

            <div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */}
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                                    <path
                                                        d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-primary"
                                                    onClick={() => saveAsNote(currentEntry)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-floppy2" viewBox="0 0 16 16">
                                                    <path
                                                        d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-danger"
                                                    onClick={() => deleteEntryAndRefresh(currentEntry)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                    <path
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                </svg>
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
