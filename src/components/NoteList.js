import React, { useContext } from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';
import selectNotes from '../selectors/notes';

const NoteList = () => {
    const { notes, filters } = useContext(NotesContext)
    /* get filtered notes */
    const notesFiltered = selectNotes(notes, filters)
    return (
        <div className="list-body">
            {notes.length === 0 ? (
                <p>You have 0 notes</p>
            ) : (
                notesFiltered.map((note) => (
                    <Note key={note.id} note={note} />
                ))
            )}
        </div>
    )
}
    
export default NoteList;