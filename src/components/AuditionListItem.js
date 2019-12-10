import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import AuthContext from '../context/auth-context';
import AuditionsContext from '../context/audition-context';
import { startRemoveAudition } from '../actions/auditions';

const AuditionListItem = ({ audition }) => {
    /* get dispatchAuditions function from the AuditionsContext */
    const { dispatchAuditions } = useContext(AuditionsContext)
    /* get user that is logged-in */
    //const { currentUser } = useContext(AuthContext)

    const removeAudition = () => {
        startRemoveAudition(dispatchAuditions, audition)
    }

    return (
        <div className="list-item">
            <Link to={`/audition/${audition.id}`}>
                <h3>{audition.title}</h3>
            </Link>
            <button onClick={removeAudition}>X</button>
        </div>    
    )
}

export { AuditionListItem as default }