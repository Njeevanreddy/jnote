import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

export default function AddNote(props) {
    const {addNote,editNote}=useContext(noteContext)
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const onclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
    }
  return (
    <div className="container">
      <h2>Add your note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={onclick}>
            Add note
        </button>
      </form>
    </div>
  );
}
