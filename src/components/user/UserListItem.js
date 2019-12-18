import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ user }) => {

    return (
        <div className="list-item">
            <Link to={`/user/${user.id}`}>
                <h3>{user.displayName}</h3>
            </Link>
        </div>    
    )
}

export default UserListItem;