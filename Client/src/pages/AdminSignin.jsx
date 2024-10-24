import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loggedin } from '../redux/admin/adminSlice'


const AdminSignin = () => {

    const [formData, setFormData] = useState({})
    const [error, setError] = useState('')
    const {adminData, isLoggedIn} = useSelector((state) => state.admin)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (isLoggedIn) {
          navigate('/admin/dashboard'); 
        }
    }, [isLoggedIn, navigate]);


    const handleChange = (e) => {
        setFormData({...adminData, [e.target.id]: e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ADMIN Data:", adminData);
        try {
          const res = await axios.post('/api/admin/signin', formData, {
            "Content-Type": "application/json",
          });
          dispatch(loggedin(res.data))
          setError('');
          navigate('/admin/dashboard', { replace: true });
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); 
            } else {
                setError('Login failed. Please try again.'); 
            }  
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
          <h1 className='text-3xl text-center font-semibold my-7'>Admin Login</h1>
          { error && 
          <p className="text-red-500 text-center mb-5">
            {error}
          </p>}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
                className='bg-slate-100 p-3 rounded-lg'
                type="email" name="email"
                placeholder="Email" id='email'
                onChange={handleChange}
                required
            />
            <input
              className='bg-slate-100 p-3 rounded-lg'
              type="password" name="password"
              placeholder="Password" id='password'
              onChange={handleChange}
              required
            />
            <button type="submit" 
             className='bg-slate-700 text-white p-3 rounded-lg uppercase 
             hover:opacity-95 disabled:opacity-80'>Login
            </button>
          </form>
          
        </div>
      );
    };

export default AdminSignin
