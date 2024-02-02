
const baseURL = "http://localhost:3000"

const getNotes = async () => {
    const response = await fetch(`${baseURL}/notes`);
    const notes = await response.json();
    console.log("NOTES", notes)
    return notes
}

const postNote = async (content) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content:content,
            important:"true",
         })
    };
    const response = await fetch(`${baseURL}/notes`, requestOptions);
    const result = await response.json();
    console.log("POST NOTES RESULT:", result)
    return result.newNote
}

const deleteNote = async (id) => {
    const requestOptions = {
        method: 'DELETE',
    };
    const response = await fetch(`${baseURL}/note/${id}`, requestOptions);
    return true
}

const updateNote = async (note) => {
    const requestOptions = {
        method: 'UPDATE',
        body: JSON.stringify({ 
            important:!note.important,
         })
    };
    const response = await fetch(`${baseURL}/note/${id}`, requestOptions);
    return true
}

export {getNotes, postNote, deleteNote, updateNote}