import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {findAllNotes} from "../services/NoteServices";
import NoteProps from '../types/note-props';
import {AddIcon} from "../common/Icons";
import NoteModal from "./NoteModal";
import Note from "./Note";
import InfoToast from "../common/InfoToast";
import ToastProps from "../types/toast-props";

/** NoteList  */
export default  function NoteList() {

    const [noteList , setNoteList] = useState<NoteProps[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newNote, setNewNote] = useState<NoteProps>({id:"", content:"", title:""});
    const [toastParam, setToastParam] = useState<ToastProps>({toastMessage: "", showToast: false})

    const handleShow = () => setShowModal(true);

    async function refreshNotes() {
        setNoteList(await findAllNotes().then());
    }

    useEffect(() => {
        refreshNotes().catch(() => setToastParam({toastMessage: "Refresh error", showToast: true}));
    }, [])


    /** Component display */
        return (
            <div>
                <NavBar/>

                {/* Header button for modal */}
                <div className="d-flex flex-row-reverse bd-highlight p-1">
                    <button type="button" className="btn btn btn-outline-primary" onClick={handleShow}>
                        <AddIcon />
                    </button>
                </div>

                {/* Loop on note List */}
                <div className="d-flex flex-column justify-content-center gap-3 px-1 mt-3"> { /* List element DIV */}
                    {
                        noteList.map(currentNote => (
                                Note(currentNote, setNewNote, handleShow, refreshNotes)
                            )
                        )
                    }
                </div>

                {/* Modal for new note */}
                {NoteModal(showModal, setShowModal, newNote, setNewNote, refreshNotes)}

                {/* Info Toast */}
                {InfoToast(toastParam, setToastParam)}

            </div>

        )
}
