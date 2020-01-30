import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { startSubscribeToNotifications, unSubscribeToNotifications, markNotificationsRead } from '../actions/users';
import AuthContext from '../context/auth-context';

// MUI 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/core/FavoriteIcon';

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const userId = currentUser.uid;

    // MUI - Menu setup
    let notificationsIcon;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsOpen = () => {
        // mark notifications as read
        notifications.map(not => not.read = true)
        // update notifications in DB
        markNotificationsRead(userId, notifications)

    }

    const setNotificationsIcon = () => {
        return (
            !!loaded ? (
                notifications && notifications.length > 0 ? (
                    notifications.filter(not => not.read === false).length > 0
                        ? notificationsIcon = (
                            <Badge badgeContent={notifications.filter(not => not.read === false).length}>
                                <NotificationsIcon />
                            </Badge>

                        ) : (
                            notificationsIcon = <NotificationsIcon />
                        )
                ) : (
                        notificationsIcon = <NotificationsIcon />
                    )
            ) : (
                    notificationsIcon = <NotificationsIcon />
                )
        )
    }

    const setNotificationsMarkup = () => {
        return (
            notifications && notifications.length > 0 ? (
                notifications.map(not => {
                    const verb = not.type === 'applied' ? 'applied' : 'something';
                    //const time = moment()
                    const icon = <FavoriteIcon />


                        <MenuItem key={not.time} onClick={handleClose}>
                            {icon}
                        </MenuItem>
            })
            ) : (
                    <MenuItem onClick={handleClose}>
                        You have no notifications yet
            </MenuItem>
                )
        )
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
        <AppBar>
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to='/'>Reels</Button>
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}>
                    {setNotificationsIcon()}
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onEntered={handleNotificationsOpen}
                >
                    {setNotificationsMarkup()}
                </Menu>

            </Toolbar>
        </AppBar>
    )
    /* return (
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
    ) */
}

export default Header;