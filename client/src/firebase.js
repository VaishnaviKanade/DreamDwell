// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8f8f0.firebaseapp.com",
  projectId: "mern-estate-8f8f0",
  storageBucket: "mern-estate-8f8f0.appspot.com",
  messagingSenderId: "156318803925",
  appId: "1:156318803925:web:61f8c24dabef172c7dff5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);