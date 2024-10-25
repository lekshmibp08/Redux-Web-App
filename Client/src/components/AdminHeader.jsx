import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loggedOut } from '../redux/admin/adminSlice';

const AdminHeader = () => {
  const { isLoggedIn } = useSelector((state) => state.admin)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    try {
      await axios.post('/api/admin/signout', {}, { withCredentials: true });
      dispatch(loggedOut());
      navigate('/admin/sign-in')
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <header className="bg-gray-800 text-white shadow-md p-4 flex justify-between items-center">
      
        <div className="text-2xl font-bold">
          <Link to="/admin/dashboard">Admin</Link>
        </div>
        { isLoggedIn &&
        <button 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSignOut}>
          Logout
        </button>
        }
    </header>
  );
};

export default AdminHeader;
