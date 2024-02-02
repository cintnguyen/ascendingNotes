import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getNotes, postNote, deleteNote, updateNote } from './services/notes.js'

function App() {
  const [notes, setNotes] = useState([]) // state are things you can see on the page
  // array destructuring 
  const [content, setContent] = useState('');


  // initial function within useEffect can not be async
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const notes = await getNotes()
        setNotes(notes)
        console.log("NOTES FROM SERVER", notes)

      } catch (error) {
        console.log("ERROR", error)
      }
    }
    fetchData()
  }, []) // default behavior of useEffect, array of dependencies, if it is an empty array it means that useEffect will only run once, and disregards any state changes including notes. If there is no array at all, then it consideres all state variables to be a dependency
  // no dependency with array, everything in the state is a dependency without the array
  // a dependency is any state variable, and if the state variable changes, the useEffect runs again

  console.log("NOTES FROM STATE", notes)

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const newNote = await postNote(content)

      console.log("NOTES AFTER POSTNOTES:", notes)
      setNotes([...notes,newNote]) //react needs to recognize new array, use spread operator to indicate this and react will rerender 123 --> 456 new address

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
     await deleteNote(id)
      // Refresh notes after deleting one
      notes.splice((id - 1),1)
      setNotes([...notes])
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async () => {
    try {
      await updateNote()

     } catch (error) {
     }
  }


  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button onClick={handleSubmit}>Send</button>

      <ul>
        {notes.map((note) => 
        <li key={note.id} >
          {note.content}
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </li>
        )}
      </ul>
    </div>
  )
}

export default App
