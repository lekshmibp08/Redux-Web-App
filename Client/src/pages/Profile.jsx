import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase'

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);    

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
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl) => {
          setFormData({...formData, profilePicture: downloadUrl});
        })
      }
    );
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto my-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          onChange={(e) => setImage(e.target.files[0])}
          type="file" ref={fileRef} hidden accept="image/*" />
        <img 
          onClick={() => fileRef.current.click()} 
          src={currentUser?.profilePicture}  
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
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3" />
        <input type="email" id="email" placeholder="Email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3" />
        <input type="password" id="password" placeholder="Password"
          className="bg-slate-100 rounded-lg p-3" />
        <button className="bg-slate-700 text-white
        rounded-lg p-3 uppercase hover:opacity-95 
        disabled:opacity-50">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span 
          className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span 
          className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default Profile
