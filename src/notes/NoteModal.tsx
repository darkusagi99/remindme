import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import NoteProps from "../types/note-props";
import {createOrUpdateNote} from "../services/NoteServices";
import ToastProps from "../types/toast-props";

/** Modal for new / update note */
export default function NoteModal(displayModal: boolean,
                                  setShowModal: (value: boolean) => void,
                                  modalInfo : NoteProps,
                                  setModalInfo : (value : NoteProps) => void,
                                  refreshNotes : () => void,
                                  setToastParam: ((p: ToastProps) => any)) {

    const handleClose = () => setShowModal(false);

    const handleChange = (event: { target: any; }) =>  {
        switch (event.target.id ) {
            case "newTitle" :
                setModalInfo({id : modalInfo.id, title : event.target.value, content : modalInfo.content});
                break;
            case "newContent" :
                setModalInfo({id : modalInfo.id, title : modalInfo.title, content : event.target.value});
                break;
            default :
                break;
        }
    }

    function saveNewNote() {
        console.log("Save Note");
        console.log(modalInfo);
        createOrUpdateNote(modalInfo).catch(() => setToastParam({toastMessage: "Creation error", showToast: true}));
        refreshNotes();
        setShowModal(false);
        setModalInfo({id:"", content:"", title:""})
        return;
    }

    return (
        <>
            <Modal show={displayModal} onHide={handleClose} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="Titre" className="col-form-label">Titre :</label>
                        <input type="text" className="form-control" id="newTitle" defaultValue={modalInfo.title} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">Contenu :</label>
                        <textarea className="form-control" id="newContent" rows={15} defaultValue={modalInfo.content} onChange={handleChange} ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveNewNote}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}