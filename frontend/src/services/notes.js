
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
            important: false,
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            important:note.important, 
            foo: "bar",
         })
    };
    console.log("BODY", requestOptions.body)
    const response = await fetch(`${baseURL}/note/${note.id}`, requestOptions);
    console.log("RESPONSE HERE", response)
    return "Updated!"
}

export {getNotes, postNote, deleteNote, updateNote}