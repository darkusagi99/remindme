import React, {Component, useEffect, useState} from 'react'
import { auth, db } from '../services/firebase';
import { ref, push, set, onValue, remove } from "firebase/database";
import { Link } from 'react-router-dom';

import '../App.css';
import NavBar from "../common/NavBar";
import {addNote, deleteNote, findAllNotes} from "../services/NoteServices";
import NoteProps from '../types/note-props';

/** Component for NoteList - v9 version */
export default  function NoteEdit() {

    const [noteList , setNoteList] = useState<NoteProps[]>([]);

    async function refreshNotes() {
        const newNoteList = await findAllNotes().then();
        setNoteList(newNoteList);
        return;
    }

    useEffect(() => {
        refreshNotes();
    }, [])

    function addNoteLocal() {
        addNote({id: "", title: "Added", content: "AddedContent"});
        refreshNotes();
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
                <button type="button" className="btn btn btn-outline-primary" onClick={() => addNoteLocal()}>
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
                                            <button type="button" className="btn btn btn-outline-danger" onClick={() => deleteNoteAndRefresh(currentNote)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                    <path
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" className="btn btn btn-outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
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
