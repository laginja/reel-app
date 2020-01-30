import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { startLogout } from '../../actions/auth';
import AuthContext from '../../context/auth-context';

// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const UserMenu = () => {
    const { currentUser } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
            >
                <MenuItem key="profile" component={Link} to={`/user/${currentUser.uid}`}>Profile</MenuItem>
                <MenuItem key="new-audition" component={Link} to={`/createAudition`}>My account</MenuItem>
                <MenuItem key="logout" onClick={startLogout} component={Link} to={`/user/${currentUser.uid}`}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}
export default UserMenu;