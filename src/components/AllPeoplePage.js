import React, { useState, useReducer, useEffect } from 'react';
import { startSetUsers } from '../actions/users';
import { filtersReducer, filtersReducerDefaultState } from '../reducers/filters';
import usersReducer from '../reducers/users';
import UsersContext from '../context/users-context';
import Loading from '../components/Loading';
import UserList from '../components/UserList';
import UserListFilters from '../components/UserListFilters';

const AllPeoplePage = () => {

    const [users, dispatchUsers] = useReducer(usersReducer, [])
    const [filters, dispatchFilters] = useReducer(filtersReducer, filtersReducerDefaultState)
    const [usersLoaded, setUsersLoaded] = useState(false)

    useEffect(() => {
        startSetUsers(dispatchUsers).then(() => {
            setUsersLoaded(true)
        })
    })

    return (
        <UsersContext.Provider value={{users, filters, dispatchFilters}}>
            <UserListFilters />
            { usersLoaded ? <UserList /> : <Loading />}

        </UsersContext.Provider>
    )
}

export default AllPeoplePage