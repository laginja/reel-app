const selectNotes = (notes, { text }) => {
    return notes.filter((note) => {
        /* True if title contains 'text' filter */
        const titleMatch = note.title.toLowerCase().includes(text.toLowerCase());

        return titleMatch
    })
}

export default selectNotes;