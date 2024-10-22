import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';


const OAuth = () => {

    const dispatch = useDispatch();

    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            const res = await axios.post('/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            });                        
            dispatch(signInSuccess(res.data));
            
        } catch (error) {
            console.log('Could not login with Google', error);           
        }
    }

  return (
    <button type='button' onClick={handleGoogleClick} 
    className='bg-red-700 text-white rounded-lg 
    p-3 uppercase hover:opacity-95'>
        Continue with Google
    </button>
  )
}

export default OAuth
