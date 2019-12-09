import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth-context';
import NotesContext from '../context/notes-context';
import { startAddNote } from '../actions/notes';

const AddNoteForm = () => {
    /* 
        'useState()' returns an array with 2 items -> 1st current state value that's gonna change over time, 
        2nd is a function we can call to update the state.

        'useState' uses 'useReducer' in the BG
    */
    /* get user that is logged-in */
    const { currentUser } = useContext(AuthContext)

    /* get dispatchNotes function from the NotesContext */
    const { dispatchNotes } = useContext(NotesContext)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('') 

    const addNote = (e) => {
        e.preventDefault()

        /* check for title and body */
        if (!title || !body) {
            setError('Please provide a title and a body')
        } else {
            startAddNote(dispatchNotes, { title, body}, currentUser)
            setTitle('')
            setBody('')
            setError('')
        }   
    };

    return (
        <div>
            { error && <p>{error}</p>}
            <form onSubmit={addNote}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button>Add note</button>
            </form>
        </div>
    )
}

export { AddNoteForm as default }