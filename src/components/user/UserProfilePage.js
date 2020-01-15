import React, { useEffect, useReducer, useContext, useState } from 'react';
import { startFetchUser } from '../../actions/users';
import { startFetchUserAuditions } from '../../actions/auditions';
import usersReducer from '../../reducers/users';
import AuthContext from '../../context/auth-context';

const UserProfilePage = (props) => {

    const uid = props.match.params.id;
    const [user, dispatchUser] = useReducer(usersReducer, [])
    const [userAuditions, setUserAuditions] = useState([])

    // Get currently logged in user 
    const { currentUser } = useContext(AuthContext)

    const isUserOwner = () => {
        if (currentUser.uid === user.uid) {
            return true
        } else {
            return false
        }
    }
    useEffect(() => {
        // Fetch user whose data should be displayed 
        startFetchUser(uid, dispatchUser)
        // Fetch auditions for this user
        startFetchUserAuditions(uid, setUserAuditions)
    }, [uid])


    return (
        <div className="content-main__item-wide">
            { isUserOwner() ? <button>Edit</button> : ""}
            <h1>{user.displayName}</h1>
            { isUserOwner() ? <h3>My auditions</h3> : <h3>{user.displayName}'s auditions</h3>}
            {console.log(userAuditions)}
        </div>
    )
}

export default UserProfilePage;