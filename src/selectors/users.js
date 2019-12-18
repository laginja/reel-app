const selectUsers = (users, { text }) => {
    return users.filter((user) => {
        /* True if title contains 'text' filter */
        const titleMatch = user.displayName.toLowerCase().includes(text.toLowerCase());

        return titleMatch
    })
}

export default selectUsers;