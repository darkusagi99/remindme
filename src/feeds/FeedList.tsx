import React, {Component, useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import FeedProps from "../types/feed-props";
import {addSetting, deleteSetting, findAllSettings} from "../services/FeedSettingService";
import {format} from "date-fns";

/** Component for FeedList - v9 version */
export default  function FeedList() {

    const [feedList , setFeedList] = useState<FeedProps[]>([]);

    async function refreshSettings() {
        const newNoteList = await findAllSettings().then();
        setFeedList(newNoteList);
        return;
    }

    useEffect(() => {
        refreshSettings();
    }, [])

    function addSettingLocal() {
        const defaultDate = new Date("1900-01-01");
        addSetting({id: "", url: "new URL", lastUpdate : defaultDate});
        refreshSettings();
        return;
    }

    function deleteSettingAndRefresh(settingToDelete: FeedProps) {
        deleteSetting(settingToDelete);
        refreshSettings();
        return;
    }

    /** Component display */
    return (
        <div>
            <NavBar/>

            <div className="d-flex flex-row-reverse bd-highlight p-1">
                <button type="button" className="btn btn btn-outline-primary" onClick={() => addSettingLocal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
            </div>

            <div className="px-5 d-flex flex-column justify-content-center gap-3 mt-5"> { /* List element DIV */}
                {
                    feedList.map(currentSetting => (
                            <div className="card" key={currentSetting.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{currentSetting.url}</h5>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex  bd-highlight">
                                        <div className="me-auto p-2">
                                            <p className="card-text">{format(currentSetting.lastUpdate, 'dd/MM/yyyy, h:mm:ss a')}</p>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-danger"
                                                    onClick={() => deleteSettingAndRefresh(currentSetting)}>
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
