const selectAuditions = (auditions, { text }) => {
    return auditions.filter((audition) => {
        /* True if title contains 'text' filter */
        const titleMatch = audition.title.toLowerCase().includes(text.toLowerCase());

        return titleMatch
    })
}

export default selectAuditions;