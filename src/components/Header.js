import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

// 'NavLink' is basically the same as 'Link' but has some features better suited for navigation
const Header = () => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>Reels</h1>
                </Link>
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>   
        </div>
    </header>
);

export default Header;