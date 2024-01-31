import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {createOrUpdateNote, deleteNote, findAllNotes} from "../services/NoteServices";
import NoteProps from '../types/note-props';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {AddIcon, DeleteIcon, EditIcon} from "../common/Icons";

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

    function editNote(currentNote : NoteProps) {
        setNewNote(Object.create(currentNote));
        handleShow();
    }

    function saveNewNote() {
        createOrUpdateNote(newNote);
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
                        <AddIcon />
                    </button>
                </div>

                <div className="d-flex flex-column justify-content-center gap-3 px-1 mt-3"> { /* List element DIV */}
                    {
                        noteList.map(currentNote => (
                            <div className="card" key={currentNote.id}>
                            <div className="card-body">
                                        <h5 className="card-title">{currentNote.title}</h5>
                                        <p className="card-text"><pre>{currentNote.content}</pre></p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-flex  bd-highlight">
                                            <div className="me-auto p-2">
                                                <button type="button" className="btn btn btn-outline-primary"
                                                        onClick={() => editNote(currentNote)}>
                                                    <EditIcon />
                                                </button>

                                            </div>
                                            <div className="p-2">
                                                <button type="button" className="btn btn btn-outline-danger"
                                                        onClick={() => deleteNoteAndRefresh(currentNote)}>
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

                {/* Modal for new note */}
                <>
                    <Modal show={show} onHide={handleClose} scrollable={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Nouvelle Note</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Titre" className="col-form-label">Titre :</label>
                                    <input type="text" className="form-control" id="newTitle" onChange={handleTitleChange} defaultValue={newNote.title}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Contenu :</label>
                                    <textarea className="form-control" id="newContent" onChange={handleNoteChange} rows={15} defaultValue={newNote.content}></textarea>
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
