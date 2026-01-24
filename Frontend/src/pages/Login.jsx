import React, { useState } from 'react'
import { api } from '../api.js';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${api}/auth/login`, { email, password })
            console.log(response.data);
            localStorage.setItem('token', response.data.token)
            navigate('/home');
        } catch (error) {
            console.log("Login Error:", error.response.data);
            alert(error.response.data.message);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='border p-4 rounded-lg shadow-lg w-3/5'>
                Login Page
                <form onSubmit={handleLogin} className='flex flex-col  mt-4'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br />
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br />
                    <button type='submit'>Login</button>
                </form>
                <NavLink to='/signup' className='text-blue-500 mt-4 inline-block'>Don't have an account? Signup</NavLink>
            </div>
        </div>
    )
}

export default Login
