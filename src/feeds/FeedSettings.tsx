import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import FeedProps from "../types/feed-props";
import {addSetting, deleteSetting, findAllSettings} from "../services/FeedSettingService";
import {format} from "date-fns";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InfoToast from "../common/InfoToast";
import {AddIcon, DeleteIcon} from "../common/Icons"
import ToastProps from "../types/toast-props";

/** Component for NoteList - v9 version */
export default function FeedSettings() {

    const [settingList , setSettingList] = useState<FeedProps[]>([]);
    const [show, setShow] = useState(false);
    const [newFeedUrl, setNewFeedUrl] = useState("");
    const [toastParam, setToastParam] = useState<ToastProps>({toastMessage: "", showToast: false})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>  {setNewFeedUrl(event.target.value);}

    async function refreshSettings() {
        const newNoteList = await findAllSettings().then();
        setSettingList(newNoteList);
        return;
    }

    useEffect(() => {
        refreshSettings();
        setToastParam({toastMessage: "New Toast Config", showToast: true});
    }, [])

    function addNewSetting() {
        const defaultDate = new Date("1900-01-01");
        addSetting({id: "", url: newFeedUrl, lastUpdate : defaultDate}).catch(() => {
            //setToastMessage("Erreur Lors de la Creation");
            //setShowToast(true);
        });
        refreshSettings();
        setShow(false);
        setNewFeedUrl("");
        return;
    }

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
        <div>
            <NavBar/>

            <div className="d-flex flex-row-reverse bd-highlight p-1">
                <button type="button" className="btn btn btn-outline-primary" onClick={() => handleShow()}>
                    <AddIcon />
                </button>
            </div>

            <div className="d-flex flex-column justify-content-center gap-3 px-1 mt-3"> { /* List element DIV */}
                {
                    settingList.map(currentSetting => (
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
                    )
                }
            </div>

            {/* Modal for new setting */}
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nouvel RSS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="URL" className="col-form-label">Feed URL :</label>
                                <input type="text" className="form-control" id="newFeedUrl" onChange={handleUrlChange}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addNewSetting}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            {/* Info Toast */}
            {InfoToast(toastParam, setToastParam)}


        </div>
    )
}
