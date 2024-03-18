import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";





const Register2 = () => {

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
      });
      const [err,setError] = useState(null)
    
      const navigate=useNavigate()
      
      const handleChange=e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
    
      }
    
      const instance = axios.create({
        withCredentials: true,
      });
    
    
      const regURL = "http://localhost:8800/api/auth/register" 
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(regURL, inputs, { withCredentials: true });
          navigate("/login");
        } catch (err) {
          if (err.response && err.response.status === 409) {
            // Status code 409 indicates conflict, which could mean a duplicate user
            setError("User already exists. Please choose a different username or email.");
          } else {
            // Handle other errors
            setError(err.response.data);
          }
        }
      };
  return (
    <div className="deneme">
    <div className='wrapper'>
    <form action="">
    
        <h1>Register</h1>
        <div className='input-box'>
            <input type="text" placeholder='UserName' name='username' onChange={handleChange} />
        </div>
        <div className='input-box'>
            <input type="email" placeholder='Email'  name='email' onChange={handleChange} />
        </div>
        <div className='input-box'>
            <input type="password" placeholder='Password' name='password' onChange={handleChange} />
        </div>
        <button onClick={handleSubmit}  type='submit' className='button'>Register</button>
        {err && <p>{err}</p>}
        <div className="register-link">
            <p>Do you have account <Link to="/login" >Login</Link>
            </p>
        </div>
    
    </form>
        </div>
        </div>
  )
}

export default Register2