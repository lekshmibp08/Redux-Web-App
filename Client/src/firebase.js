// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "redux-mern-2c4ef.firebaseapp.com",
  projectId: "redux-mern-2c4ef",
  storageBucket: "redux-mern-2c4ef.appspot.com",
  messagingSenderId: "315568219422",
  appId: "1:315568219422:web:2f758a9506cb83b9d6150f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);