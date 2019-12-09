import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth-context';
import AuditionsContext from '../context/audition-context';
import { startAddAudition } from '../actions/auditions';

const AddAuditionForm = () => {
    /* 
        'useState()' returns an array with 2 items -> 1st current state value that's gonna change over time, 
        2nd is a function we can call to update the state.

        'useState' uses 'useReducer' in the BG
    */
    /* get user that is logged-in */
    const { currentUser } = useContext(AuthContext)

    /* get dispatchAuditions function from the AuditionsContext */
    const { dispatchAuditions } = useContext(AuditionsContext)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('') 

    const addAudition = (e) => {
        e.preventDefault()

        /* check for title and body */
        if (!title || !body) {
            setError('Please provide a title and a body')
        } else {
            startAddAudition(dispatchAuditions, { title, body}, currentUser)
            setTitle('')
            setBody('')
            setError('')
        }   
    };

    return (
        <div>
            { error && <p>{error}</p>}
            <form onSubmit={addAudition}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button>Add audition</button>
            </form>
        </div>
    )
}

export { AddAuditionForm as default }