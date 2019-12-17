import React, { useEffect, useReducer } from 'react';
import { startFetchUser } from '../actions/users';
import usersReducer from '../reducers/users';

const UserProfilePage = (props) => {

    const uid = props.match.params.id;
    const [user, dispatchUser] = useReducer(usersReducer, [])

    useEffect(() => {
        startFetchUser(uid, dispatchUser)
    }, [uid])

    
    return (
        <div className="content-main__item-wide">
            <h1>{user.displayName}</h1>
        </div>
    )
}

export default UserProfilePage;