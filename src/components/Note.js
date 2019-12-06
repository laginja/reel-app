import React, { useContext } from 'react';
import NotesContex from '../context/notes-context';
import { startRemoveNote } from '../actions/notes'

const Note = ({ note }) => {
    const { dispatchNotes } = useContext(NotesContex)

    const removeNote = () => {
        startRemoveNote({ dispatchNotes, note})
    }

    return (
        <div className="list-item">
            <h3>{note.title}</h3>
            <button onClick={removeNote}>X</button>
        </div>
    )
}

export { Note as default }