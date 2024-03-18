import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import axios from "axios";
import { useState } from 'react';
import { AuthContext } from '../context/authContext.jsx';




const Login2 = () => {

    const [inputs, setInputs] = useState({
        username:"",
        password:"",
      });
      const [err,setError] = useState(null)
      
      const navigate=useNavigate()
    
      const {login} =useContext(AuthContext);
    
      
      
      const handleChange=e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
      }
     
      const logURL = "http://localhost:8800/api/auth/login" 
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(inputs);
          navigate("/");
        } catch (err) {
          setError(err.response.data);
        }
      };
  return (
    <div className="deneme">
<div className='wrapper'>
<form action="">

    <h1>Login</h1>
    <div className='input-box'>
        <input type="text" placeholder='UserName' name='username' onChange={handleChange} />
    </div>
    <div className='input-box'>
        <input type="password" placeholder='Password' name='password' onChange={handleChange} />
    </div>

    <div className="remember-forgot">
        <label >
            <input type="checkbox" />
            Remember me
        </label>
        <a href="#">Forgot password?</a>
    </div>
    <button onClick={handleSubmit}  type='submit' className='button'>Login</button>
    {err&&<p>{err}</p>}
    <div className="register-link">
        <p>Dont have an account <Link to="/register" >Register</Link>
        </p>
    </div>

</form>
    </div>
    </div>
    
  )
}

export default Login2