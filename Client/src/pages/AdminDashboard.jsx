import axios from 'axios';
import UserTable from '../components/UserTable';
import Modal from '../components/Modal'; 
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateFormData } from '../helpers/formValidation'

const AdminDashboard = () => {
  const {isLoggedIn} = useSelector((state) => state.admin);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/sign-in'); 
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');      
      setUsers(res.data.users);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);      
    }
  }


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); 
      return; 
    }

    try {
      if (isEditing) {        
        const response = await axios.post(`/api/admin/edit/${formData._id}`, formData);
        setUsers(prevUsers => prevUsers.map(user => 
          user._id === response.data.updatedUser._id ? response.data.updatedUser : user)
        );
        Swal.fire('Success', response.data.message, 'success');
      } else {
        const response = await axios.post('/api/admin/addUser', formData);
        setUsers(prevUsers => [response.data.newUser, ...prevUsers]);
        Swal.fire('Success', response.data.message, 'success');
      }
      setShowModal(false);
      setValidationErrors({}); 
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add/update the user';        
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
      });
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setShowModal(true);
    setValidationErrors({});
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete the user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/admin/delete/${userId}`);
          setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
          
          Swal.fire('Deleted!', response.data.message, 'success');

        } catch (error) {  
          const errorMessage = error.response?.data?.message || 'Failed to delete the user';        
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
        });
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Admin Dashboard
      </h1>
      <div className="flex justify-end mb-4 max-w-4xl mx-auto">
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          onClick={() => { 
            setIsEditing(false); 
            setFormData({}); 
            setShowModal(true); 
          }}
        >
          Add User
        </button>
      </div>

      {/* Modal for adding/editing user */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={isEditing ? "Edit User" : "Add User"}>
        <form className="mb-4" onSubmit={handleAddUser}>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name="username"
              id='username'
              placeholder="Username"
              value={formData.username || ''}
              onChange={handleInputChange}
              required
              className="border p-2 rounded bg-slate-100"
            />

            { validationErrors.username && 
              <p className="text-red-500">{validationErrors.username}</p>
            }

            <input
              type="email"
              name="email"
              id='email'
              placeholder="Email"
              value={formData.email || ''}
              onChange={handleInputChange}
              required
              className="border p-2 rounded bg-slate-100"
            /> 

            { validationErrors.email && 
              <p className="text-red-500">{validationErrors.email}</p>
            }

            { !isEditing &&           
              <input
                type="password"
                name="password"
                id='password'
                placeholder="Password"
                onChange={handleInputChange}
                required
                className="border p-2 rounded bg-slate-100"
              />
            }

            { validationErrors.password && 
              <p className="text-red-500">{validationErrors.password}</p>
            }

            <button 
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;
