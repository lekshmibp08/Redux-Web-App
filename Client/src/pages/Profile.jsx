import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase'
import axios from "axios";
import { useDispatch } from "react-redux";
import { 
  updateUserStart, 
  updateUserSuccess, 
  UpdateUserFailure, 
  deleteUserStart, 
  deleteUserSuccess,
  deleteUserFailure 
} from "../redux/user/userSlice";

const Profile = () => {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fileRef = useRef(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-'); 
    const fileExtension = image.name.split('.').pop(); // Get file extension
    const fileName = `image_${currentDateTime}.${fileExtension}`; // Create unique file name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (err) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setFormData({...formData, profilePicture: downloadURL});
        })
      }
    )

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(`/api/user/update/${currentUser._id}`, formData, {
        "Content-Type": "application/json",
      })
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(UpdateUserFailure(error.response?.data?.message))
    }
  }
  
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`)
      dispatch(deleteUserSuccess(res.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.response?.data?.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto my-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          onChange={(e) => setImage(e.target.files[0])}
          type="file" ref={fileRef} hidden accept="image/*" />
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData.profilePicture || currentUser?.profilePicture}  
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer 
          rounded-full object-cover mt-2"
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error Uploading Image (file size must be less than 2 MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">
              {`'Uploading: ' ${imagePercentage} '%'`}
            </span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">
              Image Uploaded Successfully
            </span>
          ) : ( "" )}
        </p>

        <input type="text" id="username" placeholder="Username"
          onChange={handleChange}
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3" />
        <input type="email" id="email" placeholder="Email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3" />
        <input type="password" id="password" placeholder="Password"
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3" />
        <button className="bg-slate-700 text-white
        rounded-lg p-3 uppercase hover:opacity-95 
        disabled:opacity-50">
          { loading ? 'Updating...' : 'Update' }
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span 
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span 
          className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 text-center text-sm mt-5">
        {error && 'Something went wrong!'}
      </p>
      <p className="text-green-600 text-center mt-5">
        {updateSuccess && 'User Updated Successfully!'}
      </p>
    </div>
  )
}

export default Profile
