import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
    const {currentUser} = useSelector((state) => state.user)
    const imageUrl = currentUser?.profilePicture;    
    
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold'>My Auth App</h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <img 
                        src={currentUser?.profilePicture} 
                        alt="profile" 
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover"
                        />
                ) : (
                    <li>Sign in</li>
                )}
                </Link>
            </ul>

        </div>
    </div>
  )
}

export default Header
