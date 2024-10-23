import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
<<<<<<< HEAD
import {app} from '../firebase'
=======
import { app } from '../firebase';
>>>>>>> c20df7a (completed image upload functinality)

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
<<<<<<< HEAD
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);    

=======
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null)
  
  console.log(formData);
  
>>>>>>> c20df7a (completed image upload functinality)
  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
<<<<<<< HEAD
  },[image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-'); 
    const fileExtension = image.name.split('.').pop(); // Get file extension
    const fileName = `image_${currentDateTime}.${fileExtension}`; // Create unique file name
    const storageRef = ref(storage, fileName)
=======
  }, [image]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-'); 
    const fileExtension = image.name.split('.').pop(); 
    const fileName = `image_${currentDateTime}.${fileExtension}`;
    const storageRef = ref(storage, fileName);
>>>>>>> c20df7a (completed image upload functinality)
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
<<<<<<< HEAD
        
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
  
=======
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

>>>>>>> c20df7a (completed image upload functinality)
  return (
    <div className="p-3 max-w-lg mx-auto my-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
<<<<<<< HEAD
        <input 
          onChange={(e) => setImage(e.target.files[0])}
          type="file" ref={fileRef} hidden accept="image/*" />
        <img 
          onClick={() => fileRef.current.click()} 
=======
        <input type="file" ref={fileRef} hidden accept="image/*" 
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img 
          onClick={() => fileRef.current.click()}
>>>>>>> c20df7a (completed image upload functinality)
          src={formData.profilePicture || currentUser?.profilePicture}  
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer 
          rounded-full object-cover mt-2"
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
<<<<<<< HEAD
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
=======
              Error uploading image(choose image file of size less tha 2MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">
              {`Uploading:  ${imagePercentage} % done`}
            </span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : '' }
>>>>>>> c20df7a (completed image upload functinality)
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
