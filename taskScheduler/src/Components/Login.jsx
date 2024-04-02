import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoSchedule from '/Images/logo-schedule.png';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if(result.data.loginStatus){
                    navigate('/Dashboard')
                } else{
                    setError(result.data.Error)
                }
                
            })
            .catch(err => console.log(err));
    };


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
            <img src={logoSchedule} alt="Logo" width="100" height="100" className="mx-auto d-block" />

                <h3 className='text-center'>Login to your account</h3>
                <br />
                <div className='text-center text-warning'>
                    {error && error}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" id="email" autoComplete='off' placeholder='Enter Email'
                           onChange={(e) => setValues({...values, email:e.target.value})} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" id="password" placeholder='Enter Password'
                            onChange={(e) => setValues({...values, password:e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
                    <div className='mb-3'>
                        <p className="text-center">Don't have an account? <a href="/register" className='text-success'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
