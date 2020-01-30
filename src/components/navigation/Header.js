import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Notifications from './Notifications';
import UserMenu from './UserMenu';

// MUI 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Header = () => {
    return (
        <AppBar color="primary">
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to='/'>Reels</Button>
                <Notifications />
                <UserMenu />
            </Toolbar>
        </AppBar>
    )
}
export default Header;