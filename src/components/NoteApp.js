import React, { useEffect, useReducer, useState, useContext } from 'react';
import { filtersReducer, filtersReducerDefaultState } from '../reducers/filters';
import notesReducer from '../reducers/notes';
import AuthContext from '../context/auth-context';
import AddNoteForm from './AddNoteForm';
import Loading from './Loading';
import NoteList from './NoteList';
import NoteListFilters from './NoteListFilters';
import NotesContext from '../context/notes-context';
import { startSetNotes } from '../actions/notes';

const NoteApp = () => {
    const { currentUser } = useContext(AuthContext)
    
    // create states and provide dispatch function for the reducer to update that state
    const [notes, dispatchNotes] = useReducer(notesReducer, [])
    const [filters, dispatchFilters] = useReducer(filtersReducer, filtersReducerDefaultState)

    /* State to track if notes have been loaded */
    const [notesLoaded, setNotesLoaded] = useState(false)

    /* Fires only once when the component mounts (or the user gets set) */
    useEffect(() => {
        /* Start async call to get notes from the DB */
        startSetNotes(dispatchNotes, currentUser).then(() => {
            /* Notes have been loaded, set to true*/
            setNotesLoaded(true)
        })
    }, [currentUser])

    return (
        <NotesContext.Provider value={{ notes, dispatchNotes, filters, dispatchFilters }}>
            <NoteListFilters />
            { notesLoaded ? <NoteList /> : <Loading />}
            <AddNoteForm />
        </NotesContext.Provider>
    )
}

export default NoteApp

