import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-blue-200'>
            <div className="flex justify-between items-center gap-10 px-8 py-4">
                <h1>EstateScout</h1>
                <div className='flex justify-center gap-10'>
                    <div>
                        <NavLink to='/login' > Login</NavLink>
                    </div>
                    <div>
                        <NavLink to='/signup' > Signup</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
