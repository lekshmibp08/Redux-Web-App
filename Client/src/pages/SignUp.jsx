import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import OAuth from '../components/OAuth';


const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
    console.log(formData); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      setError(false);  
      setLoading(true);
      const res = await axios.post('/api/auth/signup', formData);
      setLoading(false);
      setError(false);  
      navigate('/sign-in')
          
    } catch (error) {
      setLoading(false);
      setError(true);
      
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' 
        onChange={ handleChange }
        className='bg-slate-100 p-3 rounded-lg' />
        <input type="email" placeholder='Email' id='email' 
        onChange={ handleChange }
        className='bg-slate-100 p-3 rounded-lg' />
        <input type="password" placeholder='Password' id='password' 
        onChange={ handleChange }
        className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white
        p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : "Sign Up" } 
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!' }</p>
    </div>
  )
}

export default SignUp
