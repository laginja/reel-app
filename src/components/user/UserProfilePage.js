import React, { useEffect, useReducer, useContext } from 'react';
import { startFetchUser } from '../../actions/users';
import usersReducer from '../../reducers/users';
import AuthContext from '../../context/auth-context';

const UserProfilePage = (props) => {

    const uid = props.match.params.id;
    const [user, dispatchUser] = useReducer(usersReducer, [])

    /* Get currently logged in user  */
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        /* Fetch user whose data should be displayed */
        startFetchUser(uid, dispatchUser)
    }, [uid])

    
    return (
        <div className="content-main__item-wide">
            { currentUser.uid === user.uid ? <button>Edit</button> : "" }
            <h1>{user.displayName}</h1>
        </div>
    )
}

export default UserProfilePage;