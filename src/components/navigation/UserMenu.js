import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { startLogout } from '../../actions/auth';
import AuthContext from '../../context/auth-context';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() => ({
    icon: {
        'margin-right': '10px'
    },
}));

const UserMenu = () => {
    const { currentUser } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    // MUI
    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    return (
        <Fragment>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpen}>

                <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MenuItem key="profile" component={Link} to={`/user/${currentUser.uid}`}><AccountCircleIcon className={classes.icon}/>Profile</MenuItem>
                <MenuItem key="new-audition" component={Link} to={`/createAudition`}><AddCircleOutlineIcon className={classes.icon}/>Create audition</MenuItem>
                <hr/>
                <MenuItem key="logout" onClick={startLogout} component={Link} to={`/user/${currentUser.uid}`}><ExitToAppIcon className={classes.icon}/>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}
export default UserMenu;