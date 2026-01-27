import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()
  async function handleLogin(e) {
    e.preventDefault()
    let newUser = { email, password }
    console.log("login function ",newUser)
    try{
      const response= await axios.post("http://localhost:4000/api/login",newUser)
      console.log(response)
      if(response.status==200){
        localStorage.setItem("userId",response.data.userId)
        localStorage.setItem("role",response.data.role)
        navigate("/")
      }
    }
    catch(err){
      console.log("error from login",err)
      if(err.status==400){
        alert(err.response.data.message)
      }
    }
  }
  return (
    <div className='container mt-4'>
      <div className="row">
        <form onSubmit={handleLogin} className='col-12 col-md-6'>
            <div className='mb-3'>
              <h2>Login</h2>
            </div>
          <div className='mb-3'>
            <label className="form-label">Email </label>
            <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label className="form-label">Password </label>
            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
            <div className='mb-3'>
              <button className="btn btn-primary">Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}
