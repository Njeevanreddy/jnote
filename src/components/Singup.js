import React, { useContext, useState } from 'react'
import authContext from '../context/authContext';
export default function Singup() {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    const {signup}=useContext(authContext);
    const {email,password,name,cpassword}=credentials;
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const onsubmit=(e)=>{
        e.preventDefault();
        if(password!==cpassword){
            alert("password and confirm password must be  same")
        }else{
            signup(name,email,password)
        }
        
    }
  return (
    <div className='container'>
      <form onSubmit={onsubmit}>
      <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" onChange={onchange} className="form-control" id="name" name="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" onChange={onchange} className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={onchange} className="form-control" name="password" id="password"/>
        </div>
        <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="cpassword" onChange={onchange} className="form-control" name="cpassword" id="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
