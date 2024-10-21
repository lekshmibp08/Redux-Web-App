import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';


const SignIn = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
    console.log(formData); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      dispatch(signInStart())
      const res = await axios.post('/api/auth/signin', formData);
      dispatch(signInSuccess(res.data)) 
      navigate('/');
          
    } catch (error) {
      dispatch(signInFailure(error))
      
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <p className='text-red-700 mt-5 mb-5 text-center'>{error && 'Invalid Credential!' }</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type="email" placeholder='Email' id='email' 
        onChange={ handleChange }
        className='bg-slate-100 p-3 rounded-lg' />
        <input type="password" placeholder='Password' id='password' 
        onChange={ handleChange }
        className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white
        p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : "Sign In" } 
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      
    </div>
  )
}

export default SignIn
