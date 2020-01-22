import React, { useContext, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { startRemoveAudition } from '../../actions/auditions';
import { startFetchUser } from '../../actions/users';
import usersReducer from '../../reducers/users';
import AuditionsContext from '../../context/audition-context';

const AuditionListItem = ({ audition }) => {
    /* get dispatchAuditions function from the AuditionsContext */
    const { dispatchAuditions } = useContext(AuditionsContext)
    /* get user that is logged-in */
    //const { currentUser } = useContext(AuthContext)

    const removeAudition = () => {
        console.log("list item")
        startRemoveAudition(audition, dispatchAuditions)
    }

    const [owner, dispatchOwner] = useReducer(usersReducer, [])

    useEffect(() => {
        startFetchUser(audition.ownerId, dispatchOwner)
    }, [audition.ownerId])

    return (
        <div className="list-item">
            <Link to={`audition/${audition.id}`}>
                <h3>{audition.title}</h3>
            </Link>
            <h5>Created by
                <Link to={`user/${owner.uid}`}>
                    {owner.displayName}
                </Link>
            </h5>
            <button onClick={removeAudition}>X</button>
        </div>
    )
}

export { AuditionListItem as default }