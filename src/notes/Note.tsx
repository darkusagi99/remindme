import {DeleteIcon, EditIcon} from "../common/Icons";
import React from "react";
import NoteProps from "../types/note-props";
import {deleteNote} from "../services/NoteServices";

export default function Note(currentNote : NoteProps, setNewNote : (currentNote : NoteProps) => void, showModal : () => void, refreshNotes : () => void) {

    function editNote(currentNote : NoteProps) {
        setNewNote(Object.create(currentNote));
        showModal();
    }


    function deleteNoteAndRefresh(noteToDelete: NoteProps) {
        deleteNote(noteToDelete).then(() => refreshNotes());
        return;
    }

    return (
        <div className="card" key={currentNote.id}>
            <div className="card-body">
                <h5 className="card-title">{currentNote.title}</h5>
                <p className="card-text">
                    <pre>{currentNote.content}</pre>
                </p>
            </div>
            <div className="card-footer">
                <div className="d-flex  bd-highlight">
                    <div className="me-auto p-2">
                        <button type="button" className="btn btn btn-outline-primary"
                                onClick={() => editNote(currentNote)}>
                            <EditIcon/>
                        </button>

                    </div>
                    <div className="p-2">
                        <button type="button" className="btn btn btn-outline-danger"
                                onClick={() => deleteNoteAndRefresh(currentNote)}>
                            <DeleteIcon/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}