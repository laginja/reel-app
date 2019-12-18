import React, { useContext } from 'react';
import UserListItem from './UserListItem';
import UsersContext from '../context/users-context';
import selectUsers from '../selectors/users';

const UserList = () => {
    const { users, filters } = useContext(UsersContext)
    /* get filtered Users */
    const usersFiltered = selectUsers(users, filters)
    return (
        <div className="list-body">
            {users.length === 0 ? (
                <p>0 users</p>
            ) : (
                usersFiltered.map((user) => (
                    <UserListItem key={user.id} user={user} />
                ))
            )}
        </div>
    )
}
    
export default UserList;