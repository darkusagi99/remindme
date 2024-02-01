import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {findAllEntries, updateAllFeeds} from "../services/FeedService";
import FeedEntryProps from "../types/feed-entry-props";
import {RefreshIcon} from "../common/Icons";
import FeedEntry from "./FeedEntry";

/** Component for FeedList Screen */
export default function FeedList({toastParam, setToastParam} : any) {

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

    /** Component display */
    return (
        <div>
            <NavBar/>

            {/* Main action button */}
            <div className="d-flex flex-row-reverse bd-highlight p-1">
                <button type="button" className="btn btn btn-outline-primary" onClick={() => refreshFeedList()}>
                    <RefreshIcon />
                </button>
            </div>

            {/* Loop on feed list */}
            <div className="d-flex flex-column justify-content-center gap-3 px-1 mt-3">
                {
                    feedList.map(currentEntry => (
                        FeedEntry(currentEntry, refreshFeedList)
                        )
                    )
                }
            </div>
        </div>
    )
}
