import React, { useContext, useState } from 'react'
import authContext from '../context/authContext';
export default function Login() {
    const [credentials,setCredentials]=useState({email:"",password:""})
    const {login}=useContext(authContext);
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const onsubmit=(e)=>{
        e.preventDefault();
        login(credentials.email,credentials.password)
    }
  return (
    <div className='container'>
      <form onSubmit={onsubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" onChange={onchange} className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" onChange={onchange} className="form-control" name="password" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
