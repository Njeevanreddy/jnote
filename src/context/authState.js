import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";
const NoteState=(props)=>{
    const host="https://jnote-backend.el.r.appspot.com";
    const navigate= useNavigate()
    const login=async (email,password)=>{
        const response= await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers: {
                'Content-type':'application/json',
            },body:JSON.stringify({email,password})
        });
        const json=await response.json()
        if(json.sucess){
            localStorage.setItem('token',json.authtoken)
            navigate("/home")
        }else{
            alert("invalid credentials")
        }
    }

    const signup=async (name,email,password)=>{
        const response= await fetch(`${host}/api/auth/signup`,{
            method:'POST',
            headers: {
                'Content-type':'application/json',
            },body:JSON.stringify({name,email,password})
        });
        const json=await response.json()
        if(json.sucess){
            localStorage.setItem('token',json.authtoken)
            navigate("/home")
        }else{
            alert("invalid credentials")
        }
    }
        
        return(
            <AuthContext.Provider value={{login,signup}}>
                    {props.children}
            </AuthContext.Provider>
        );
}


export default NoteState;
