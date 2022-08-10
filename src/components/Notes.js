import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/noteContext'
import AddNote from './AddNote'
import Card from './Card'

export default function Notes() {
    const {notes,getAllNotes,editNote}=useContext(noteContext)
    const navigate=useNavigate()
    useEffect(()=>{

        if(localStorage.getItem('token')){
            getAllNotes()
        }else{
            navigate('/login')
        }
        //eslint-disable-next-line
    },[])
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        refClose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag)
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote=(note)=>{
        ref.current.click()
        setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
    }
    return (
    <div className="container">
        <AddNote></AddNote>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addnote">
        </button>

        <div className="modal fade" id="addnote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit your note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle"
                    value={note.etitle}
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
                    name="edescription"
                    value={note.edescription}
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
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                />
                </div>
            </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>update note</button>
            </div>
            </div>
        </div>
        </div>
        <h2>Here are your notes</h2>
        {notes.length===0&&"No notes to display"}
        <div className='row my-3'>
        {notes.map((note)=>{
            return <Card key={note._id} note={note} updateNote={updateNote}></Card>
            })}
        </div>
</div>
  )
}
