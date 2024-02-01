import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {addSetting} from "../services/FeedSettingService";

export default function FeedModal(showModal: boolean, setShowModal: (value: boolean) => void, refreshSettings : () => void) {

    const [newFeedUrl, setNewFeedUrl] = useState("");
    const handleClose = () => setShowModal(false);

    const handleUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>  {setNewFeedUrl(event.target.value);}

    function addNewSetting() {
        const defaultDate = new Date("1900-01-01");
        addSetting({id: "", url: newFeedUrl, lastUpdate : defaultDate}).catch(() => {

        });
        refreshSettings();
        setShowModal(false);
        setNewFeedUrl("");
        return;
    }


    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvel RSS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="URL" className="col-form-label">Feed URL :</label>
                        <input type="text" className="form-control" id="newFeedUrl" onChange={handleUrlChange}/>
                    </div>
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
    );

}