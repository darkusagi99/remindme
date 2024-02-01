import React from 'react'

import '../App.css';
import FeedProps from "../types/feed-props";
import {deleteSetting} from "../services/FeedSettingService";
import {format} from "date-fns";
import {DeleteIcon} from "../common/Icons"

/** Component for NoteList - v9 version */
export default function Settings(currentSetting : FeedProps, refreshSettings : () => void) {

    function deleteSettingAndRefresh(settingToDelete: FeedProps) {
        deleteSetting(settingToDelete).catch(() => {
            //setToastMessage("Erreur Lors de la suppression");
            //setShowToast(true);
        });
        refreshSettings();
        return;
    }

    /** Component display */
    return (
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
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
