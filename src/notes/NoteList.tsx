import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {addNote, deleteNote, findAllNotes} from "../services/NoteServices";
import NoteProps from '../types/note-props';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/** Component for NoteList - v9 version */
export default  function NoteList() {

    const [noteList , setNoteList] = useState<NoteProps[]>([]);
    const [show, setShow] = useState(false);
    const [newNote, setNewNote] = useState<NoteProps>({id:"", content:"", title:""});

    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>  {newNote.title = event.target.value.toString()}
    const handleNoteChange = (event: { target: { value: React.SetStateAction<string>; }; }) =>  {newNote.content = event.target.value.toString()}

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function refreshNotes() {
        const newNoteList = await findAllNotes().then();
        setNoteList(newNoteList);
        return;
    }

    useEffect(() => {
        refreshNotes();
    }, [])

    function saveNewNote() {
        addNote(newNote);
        refreshNotes();
        setShow(false);
        setNewNote({id:"", content:"", title:""})
        return;
    }

    function deleteNoteAndRefresh(noteToDelete: NoteProps) {
        deleteNote(noteToDelete);
        refreshNotes();
        return;
    }

    /** Component display */
        return (
            <div>
                <NavBar/>

                <div className="d-flex flex-row-reverse bd-highlight p-1">
                    <button type="button" className="btn btn btn-outline-primary" onClick={handleShow}>
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
                        noteList.map(currentNote => (
                            <div className="card" key={currentNote.id}>
                            <div className="card-body">
                                        <h5 className="card-title">{currentNote.title}</h5>
                                        <p className="card-text">{currentNote.content}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-flex  bd-highlight">
                                            <div className="me-auto p-2">
                                                <button type="button" className="btn btn btn-outline-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-pencil"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                                    </svg>
                                                </button>

                                            </div>
                                            <div className="p-2">
                                                <button type="button" className="btn btn btn-outline-danger"
                                                        onClick={() => deleteNoteAndRefresh(currentNote)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-trash"
                                                         viewBox="0 0 16 16">
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

                {/* Modal for new note */}
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Nouvelle Note</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Titre" className="col-form-label">Titre :</label>
                                    <input type="text" className="form-control" id="newTitle" onChange={handleTitleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Contenu :</label>
                                    <textarea className="form-control" id="newContent" onChange={handleNoteChange}></textarea>
                                </div>
                            </form>
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

            </div>


        )
}
