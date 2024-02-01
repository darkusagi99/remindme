import React from 'react'

import '../App.css';
import {deleteEntry} from "../services/FeedService";
import FeedEntryProps from "../types/feed-entry-props";
import {createOrUpdateNote} from "../services/NoteServices";
import {DeleteIcon, LinkIcon, SaveIcon} from "../common/Icons";

/** Component for FeedList Screen */
export default function FeedEntry(currentEntry: FeedEntryProps, refreshSettings : () => void) {

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
}
