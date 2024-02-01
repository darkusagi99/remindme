import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import FeedProps from "../types/feed-props";
import {findAllSettings} from "../services/FeedSettingService";
import {AddIcon} from "../common/Icons"
import FeedModal from "./FeedModal";
import Settings from "./Setting";

/** Component for FeedSettings screen */
export default function FeedSettings({setToastParam} : any) {

    const [settingList , setSettingList] = useState<FeedProps[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);

    async function refreshSettings() {
        setSettingList(await findAllSettings().then());
    }

    useEffect(() => {
        refreshSettings().catch(() => setToastParam({toastMessage: "Erreur lors du chargement", showToast: true}));
    }, [])


    /** Component display */
    return (
        <div>
            <NavBar/>

            {/* Bouton d'action */}
            <div className="d-flex flex-row-reverse bd-highlight p-1">
                <button type="button" className="btn btn btn-outline-primary" onClick={() => handleShow()}>
                    <AddIcon />
                </button>
            </div>

            {/* Liste des configurations */}
            <div className="d-flex flex-column justify-content-center gap-3 px-1 mt-3"> { /* List element DIV */}
                {
                    settingList.map(currentSetting => (
                            Settings(currentSetting, refreshSettings, setToastParam)
                        )
                    )
                }
            </div>

            {/* Modal for new setting */}
            {FeedModal(showModal, setShowModal, refreshSettings, setToastParam)}

        </div>
    )
}
