import React, { useState } from 'react'
import { api } from '../api.js';
import { NavLink, redirect } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${api}/auth/register`, { name, email, password })
            console.log(response.data);
            navigate('/home');
        } catch (error) {
            console.log("Signup Error:", error.response.data);
            alert(error.response.data.message);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='border p-4 rounded-lg shadow-lg w-3/5'>
                Signup Page
                <form onSubmit={handleSignup} className='flex flex-col  mt-4'>
                    <label htmlFor="">Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Enter your name' value={name} required />
                    <br />
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br />
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br />
                    <button type='submit'>Signup</button>
                </form>
                <NavLink to='/login' className='text-blue-500 mt-4 inline-block'>Already have an account? Login</NavLink>
            </div>
        </div>
    )
}

export default Signup
