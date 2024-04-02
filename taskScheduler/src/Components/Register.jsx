// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoSchedule from '/Images/logo-schedule.png';

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        axios.post('http://localhost:3000/auth/register', values)
            .then(result => {
                if(result.data.registerStatus){
                    navigate('/login')
                } else{
                    setError(result.data.Error)
                }
                
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 registerPage'>
            <div className='p-3 rounded w-25 border loginForm'>
            <img src={logoSchedule} alt="Logo" width="100" height="100" className="mx-auto d-block" />
                <h3 className='text-center'>Register</h3>
                
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
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword"><strong>Confirm Password:</strong></label>
                        <input type="password" id="confirmPassword" placeholder='Confirm Password'
                            onChange={(e) => setValues({...values, confirmPassword:e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
