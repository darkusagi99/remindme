import React, {useEffect, useState} from 'react'

import '../App.css';
import NavBar from "../common/NavBar";
import {findAllNotes} from "../services/NoteServices";
import NoteProps from '../types/note-props';
import {AddIcon} from "../common/Icons";
import NoteModal from "./NoteModal";
import Note from "./Note";

/** NoteList  */
export default function NoteList({setToastParam} : any) {

    const [noteList , setNoteList] = useState<NoteProps[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newNote, setNewNote] = useState<NoteProps>({id:"", content:"", title:""});

    const handleShow = () => setShowModal(true);

    async function refreshNotes() {
        setNoteList(await findAllNotes());
    }

    useEffect(() => {
        refreshNotes().catch(() => setToastParam({toastMessage: "Refresh error", showToast: true}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                Note(currentNote, setNewNote, handleShow, refreshNotes, setToastParam)
                            )
                        )
                    }
                </div>

                {/* Modal for new note */}
                {NoteModal(showModal, setShowModal, newNote, setNewNote, refreshNotes, setToastParam)}

            </div>

        )
}
