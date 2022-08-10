import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";

export default function Card(props) {
  const {deleteNote}=useContext(noteContext)
  const {note,updateNote}=props
  return (
    <div className="col-md-3" >
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
          <p align="left" className="card-text ">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
