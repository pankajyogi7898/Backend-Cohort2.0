import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState(" ")
  const [description, setDescription] = useState(" ")
  const [editId, setEditId] = useState(null)

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.note)
      })
  }
  useEffect(() => {
    fetchNotes()
  }, [])


  //  create + update
  function formHandler(e) {
    e.preventDefault()
    if (editId) {
      axios.patch("http://localhost:3000/api/notes/" + editId, {
        title, description
      })
        .then((res) => {
          console.log(res.data)
          setTitle("")
          setDescription("")
          setEditId(null)
          fetchNotes()
        })
    }
    else {
      axios.post("http://localhost:3000/api/notes", {
        title,
        description
      })
        .then((res) => {
          console.log(res.data)
          fetchNotes()
          setTitle("")
          setDescription("")

        })

    }

  }

  function deleteHandler(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data)
        fetchNotes()
      })
  }
  function updateHandler(note) {

    setTitle(note.title)
    setDescription(note.description)

    setEditId(note._id)

  }


  return (
    <>
      <div id="form-data">
        <form action="" onSubmit={formHandler}>
          <input
            name="title"
            type="text"
            placeholder='enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            name="description"
            type="text"
            placeholder='enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button id='createbtn'>
            {editId ? "Update Note" : "Create Note"}
          </button>
        </form>
      </div>
      <div className="notes">
        {
          notes.map((note) => {
            return <div className="note">
              <h1>{note.title}</h1>
              <h3>{note.description}</h3>
              <button id='dltbtn' onClick={() => deleteHandler(note._id)}>Delete</button>
              <button id='uptbtn' onClick={() => updateHandler(note)}>Update</button>


            </div>
          })
        }

      </div>

    </>
  )
}

export default App
