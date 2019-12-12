import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import AuthContext from '../context/auth-context';

// 'NavLink' is basically the same as 'Link' but has some features better suited for navigation
const Header = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1>Reels</h1>
                    </Link>
                    <h3 className="header__title">
                        Welcome, { currentUser.displayName }
                    </h3>
                    <Link className="header__title" to="/createAudition">
                        <h3>Create Audition</h3>
                    </Link>
                    <button className="button button--link" onClick={startLogout}>Logout</button>
                </div>   
            </div>
        </header>
    )
}

export default Header;