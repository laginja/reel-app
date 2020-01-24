import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import AuthContext from '../context/auth-context';

const Header = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1>Reels</h1>
                    </Link>
                    
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