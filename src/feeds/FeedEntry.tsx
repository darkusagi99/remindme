import React from 'react'

import '../App.css';
import {deleteEntry} from "../services/FeedService";
import FeedEntryProps from "../types/feed-entry-props";
import {createOrUpdateNote} from "../services/NoteServices";
import {DeleteIcon, LinkIcon, SaveIcon} from "../common/Icons";
import ToastProps from "../types/toast-props";
import SanitizedMarkup from "../common/SanitizedMarkup";

/** Feed element entry */
export default function FeedEntry(currentEntry: FeedEntryProps, refreshSettings : () => void, setToastParam: ((p: ToastProps) => void)) {

    function deleteEntryAndRefresh(settingToDelete: FeedEntryProps) {
        deleteEntry(settingToDelete).catch(() => setToastParam({toastMessage: "Delete error", showToast: true}));
        refreshSettings();
        return;
    }

    function saveAsNote(entryToSave: FeedEntryProps) {
        createOrUpdateNote({id: "", title : entryToSave.title, content : entryToSave.url})
            .catch(() => setToastParam({toastMessage: "Creation error", showToast: true}));
        refreshSettings();
        return;
    }

    function openInBrowser(currentFeedEntry: FeedEntryProps) {
        window.open(currentFeedEntry.url, "_blank", "noreferrer")
        return;
    }

    function showImage(currentEntry: FeedEntryProps) {
        if (currentEntry.imageLink === "") {
            return "";
        } else {
            return <div className="RssCaptionDiv"><img src={currentEntry.imageLink} alt={currentEntry.description} className="RssCaption"/></div>;
        }
    }

    /** Component display */
    return (
        <div className="card" key={currentEntry.id}>
                <div className="card-body">
                    <h5 className="card-title">{currentEntry.title}</h5>
                    <div className="card-text">
                        <SanitizedMarkup dirtyHtml={currentEntry.description} />
                    </div>
                    {showImage(currentEntry)}
                </div>
                <div className="card-footer">
                    <div className="d-flex bd-highlight justify-content-between">
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
