// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBCDG3wZ3w4PFjZl0TRMLU1jTjb4x_zhLs",
  authDomain: "vite-cf7a5.firebaseapp.com",
  projectId: "vite-cf7a5",
  storageBucket: "vite-cf7a5.appspot.com",
  messagingSenderId: "532014988210",
  appId: "1:532014988210:web:206298191c89bd930982ab",
  measurementId: "G-J01FHT4494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const DB = getFirestore(app);
export const Storage = getStorage(app)