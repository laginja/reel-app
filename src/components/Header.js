import React, { useState, useContext, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { startSubscribeToNotifications, unSubscribeToNotifications, markNotificationsRead } from '../actions/users';
import AuthContext from '../context/auth-context';

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const userId = currentUser.uid;

    const handleOnToggle = (show) => {
        if (show) {
            // mark notifications as read
            notifications.map(not => not.read = true)
            // update notifications in DB
            markNotificationsRead(userId, notifications)
        }
    }

    // this mounts and unmounts as user visits new routes
    // for that reason we must unsubscribe from notifications everytime the component unmounts to prevent memory leak
    useEffect(() => {
        let onNotificationChange;
        // subscribe to notifications and resolve with the callback function
        startSubscribeToNotifications(userId, setNotifications).then(func => {
            setLoaded(true)
            onNotificationChange = func
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

                    <img src={currentUser.photoURL} className="profile-picture" alt="" />
                    <Dropdown onToggle={handleOnToggle}>
                        <Dropdown.Toggle id="dropdown-basic" className="dropdown__toggle">
                            {
                                !!loaded ? (
                                    notifications && notifications.length > 0 ? (
                                        notifications.filter(not => not.read === false).length > 0 ? (
                                            notifications.filter(not => not.read === false).length
                                        ) : "0"
                                    ) : "You don't have any notifications"
                                ) :
                                    "0"
                            }
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown__menu" >
                            {
                                notifications.map(notification => {
                                    return (<Dropdown.Item key={notification.time}
                                        href={`/audition/${notification.auditionId}`}>
                                        {notification.senderName} applied to {notification.auditionTitle}
                                    </Dropdown.Item>)
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="dropdown__toggle">
                            {currentUser.displayName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown__menu">
                            <Dropdown.Item href={`/user/${currentUser.uid}`}>Profile</Dropdown.Item>
                            <Dropdown.Item href={'/createAudition'}>Create Audition</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={startLogout} className="item">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

export default Header;