import React, { useState, useContext, useEffect, useReducer } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { startSubscribeToNotifications, unSubscribeToNotifications,setNotifications } from '../actions/users';
import usersReducer from '../reducers/users';
import AuthContext from '../context/auth-context';

const Header = () => {
    const { currentUser } = useContext(AuthContext)
    const [notifications, dispatchNotifications] = useState()

    const userId = currentUser.uid;
    // this mounts and unmounts as user visits new routes
    // for that reason we must unsubscribe from notifications everytime the component unmounts to prevent memory leak
    useEffect(() => {
        // subscribe to notifications and return the callback function
        let onNotificationChange
        startSubscribeToNotifications(userId, dispatchNotifications).then((notif, func) => {
            onNotificationChange = func
            dispatchNotifications(notif)
        })
        return () => {
            // unsubscribe from notifications by passing the callback function
            unSubscribeToNotifications(userId, onNotificationChange)
        }
    }, [userId])

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1>Reels</h1>
                    </Link>
                    {notifications && console.log("header", notifications[0].auditionTitle)}
                    <img src={currentUser.photoURL} className="profile-picture" alt="" />
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="dropdown__toggle">
                            {currentUser.displayName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown__menu">
                            <Dropdown.Item href={`/user/${currentUser.uid}`}>Profile</Dropdown.Item>
                            <Dropdown.Item href={'/createAudition'}>Create Audition</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={startLogout} className="item">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

export default Header;