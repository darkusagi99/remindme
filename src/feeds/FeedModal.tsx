import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {addSetting} from "../services/FeedSettingService";
import ToastProps from "../types/toast-props";

/** Create new Field modal */
export default function FeedModal(showModal: boolean, setShowModal: (value: boolean) => void, refreshSettings : () => void, setToastParam: ((p: ToastProps) => void)) {

    const [newFeedUrl, setNewFeedUrl] = useState("");
    const handleClose = () => setShowModal(false);

    const handleUrlChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>  {setNewFeedUrl(event.target.value);}

    function addNewSetting() {
        addSetting(newFeedUrl)
            .then(() => refreshSettings())
            .catch(() => {
                setToastParam({toastMessage: "Creation error", showToast: true})
            });

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