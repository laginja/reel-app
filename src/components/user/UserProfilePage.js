import React, { useEffect, useReducer, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { startFetchUser } from '../../actions/users';
import { startFetchUserAuditions, startFetchUserApplications } from '../../actions/auditions';
import auditionsReducer from '../../reducers/auditions';
import usersReducer from '../../reducers/users';
import AuthContext from '../../context/auth-context';
import Loading from '../Loading';

const UserProfilePage = (props) => {

    const uid = props.match.params.id;
    const [user, dispatchUser] = useReducer(usersReducer, [])
    // state to represent user owned auditions
    const [userAuditions, dispatchUserAuditions] = useReducer(auditionsReducer, [])
    // state to represent auditions the user applied to
    const [userApplications, dispatchUserApplications] = useReducer(auditionsReducer, [])

    // state to track if userAuditions have been loaded 
    const [userAuditionsLoaded, setUserAuditionsLoaded] = useState(false)
    // state to track if appliedAuditions have been loaded 
    const [userApplicationsLoaded, setUserApplicationsLoaded] = useState(false)

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
        startFetchUserAuditions(uid, dispatchUserAuditions).then(() => {
            // userAuditions have been loaded, set to true
            setUserAuditionsLoaded(true)
        })
        // Fetch applications for this user
        startFetchUserApplications(uid, dispatchUserApplications).then(() => {
            // appliedUserAuditions have been loaded, set to true
            setUserApplicationsLoaded(true)
        })
        
    }, [uid])

    return (
        <div className="content-main__item-wide">
            { isUserOwner() ? <button>Edit</button> : ""}
            <h1>{user.displayName}</h1>

            { isUserOwner() ? <h3>My auditions</h3> : <h3>{user.displayName}'s auditions</h3>}
            { userAuditionsLoaded ? (userAuditions.map((userAudition) => {
                return <Link to={`/audition/${userAudition.id}`} key={userAudition.id}><h5>{userAudition.title}</h5></Link>
            }) ) : <Loading />}

            { isUserOwner() ? <h3>My applications</h3> : <h3>{user.displayName}'s application</h3>}
            { userApplicationsLoaded ? (userApplications.map((userApplication) => {
                return <Link to={`/audition/${userApplication.id}`} key={userApplication.id}><h5>{userApplication.title}</h5></Link>
            }) ) : <Loading />}
        </div>
    )
}

export default UserProfilePage;