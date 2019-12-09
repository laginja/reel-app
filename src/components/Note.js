import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import NotesContex from '../context/notes-context';
import { startRemoveNote } from '../actions/notes'

const Note = ({ note }) => {
    /* get dispatchNotes function from the NotesContext */
    const { dispatchNotes } = useContext(NotesContex)
    /* get user that is logged-in */
    const { currentUser } = useContext(AuthContext)

    const removeNote = () => {
        startRemoveNote(dispatchNotes, note, currentUser)
    }

    return (
        <Link to={`/audition/${note.id}`}>
            <div className="list-item">
                <h3>{note.title}</h3>
                <button onClick={removeNote}>X</button>
            </div>
        </Link>
        
    )
}

export { Note as default }