import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { startSubscribeToNotifications, unSubscribeToNotifications, markNotificationsRead } from '../../actions/users';
import AuthContext from '../../context/auth-context';

// MUI
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Notifications = () => {
    const { currentUser } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const userId = currentUser.uid;

    // MUI - Menu setup
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        handleNotificationsOpen();
    };

    const handleNotificationsOpen = () => {
        // mark notifications as read
        notifications.map(not => not.read = true);
        // update notifications in DB
        markNotificationsRead(userId, notifications);
    }

    // this mounts and unmounts as user visits new routes
    // for that reason we must unsubscribe from notifications everytime the component unmounts to prevent memory leak
    useEffect(() => {
        let onNotificationChange;
        // subscribe to notifications and resolve with the callback function
        startSubscribeToNotifications(userId, setNotifications).then(func => {
            setLoaded(true);
            onNotificationChange = func;
        })

        return () => {
            // unsubscribe from notifications by passing the callback function
            unSubscribeToNotifications(userId, onNotificationChange);
        }
    }, [userId])

    const setNotificationsIcon = () => {
        return (
            !!loaded ? (
                notifications && notifications.length > 0 ? (
                    notifications.filter(not => not.read === false).length > 0
                        ? (
                            <Badge badgeContent={notifications.filter(not => not.read === false).length}
                                max={10}
                                color="secondary">
                                <NotificationsIcon />
                            </Badge>

                        ) : (
                            <NotificationsIcon />
                        )
                ) : (
                        <NotificationsIcon />
                    )
            ) : (
                    <NotificationsIcon />
                )
        )
    }

    let notificationsMarkup = (
        notifications && notifications.length > 0 ? (
            notifications.map(not => {
                //const verb = not.type === 'applied' ? 'applied' : 'something';
                const time = moment(not.time).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon = <NotificationsIcon color={iconColor} style={{ marginRight: 10 }} />

                return (
                    <MenuItem key={not.time} onClick={handleClose}>
                        {icon}
                        <Typography
                            variant="body1"
                        >
                            <span className="notifications__markup"><span className="notifications__markup--bold"><Link to={`/user/${not.senderId}`}>{not.senderName}</Link></span> applied to
                            <span className="notifications__markup--bold"> <Link to={`/audition/${not.auditionId}`}>{not.auditionTitle.substring(0, 20)}...</Link></span> {time}</span>
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
                <MenuItem onClick={handleClose}>
                    You have no notifications yet
                </MenuItem>
            )
    )

    return (
        <Fragment>
            <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                color="inherit"
                aria-haspopup="true"
                onClick={handleOpen}>
                {setNotificationsIcon()}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}
export default Notifications;