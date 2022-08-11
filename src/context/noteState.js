import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    const host="https://jnote-backend.el.r.appspot.com"
        const notesInitial=[]
        
        const [notes,setNotes]=useState(notesInitial)

        const getAllNotes=async ()=>{
            const response= await fetch(`${host}/api/notes/fetchallnotes`,{
                method:'GET',
                headers: {
                    'Content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await response.json()
            setNotes(json);
        }
        const addNote=async (title,description,tag)=>{
            const response= await fetch(`${host}/api/notes/addnote`,{
                method:'POST',
                headers: {
                    'Content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({title,description,tag})
            });
            const note= await response.json()

            setNotes(notes.concat(note));
        }

        const deleteNote=async (id)=>{
            
            const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
                method:'DELETE',
                headers: {
                    'Content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const newNotes =await notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
        }

        const editNote= async (id,title,description,tag)=>{
            const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
                method:'PUT',
                headers: {
                    'Content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({title,description,tag})
            });
            let newNotes= JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if(element._id===id){
                    newNotes[index].title=title
                    newNotes[index].description=description
                    newNotes[index].tag=tag
                    break;
                }
            }
            setNotes(newNotes)
        }
        return(
            <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
                    {props.children}
            </NoteContext.Provider>
        );
}


export default NoteState;
