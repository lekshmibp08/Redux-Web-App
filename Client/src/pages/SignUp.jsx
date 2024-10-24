import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OAuth from '../components/OAuth';
import { validateFormData } from '../helpers/formValidation'; // Import the combined validation function

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/auth/signup', formData);
      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data.message }); // Use the message from the backend
      } else {
        setErrors({ apiError: 'Something went wrong!' });
      }
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      
      {errors.apiError && 
      <p className='text-red-700 mt-5 mb-5 text-center'>
        {errors.apiError}
      </p>
      }

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username'
          id='username'
          onChange={handleChange}
          className={`bg-slate-100 p-3 rounded-lg ${errors.username ? 'border-red-500' : ''}`}
        />
        {errors.username && <p className='text-red-500'>{errors.username}</p>}

        <input
          type="email"
          placeholder='Email'
          id='email'
          onChange={handleChange}
          className={`bg-slate-100 p-3 rounded-lg ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className='text-red-500'>{errors.email}</p>}

        <input
          type="password"
          placeholder='Password'
          id='password'
          onChange={handleChange}
          className={`bg-slate-100 p-3 rounded-lg ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && <p className='text-red-500'>{errors.password}</p>}

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
