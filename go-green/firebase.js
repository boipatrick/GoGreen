// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaWTTNXIBogmA_N5B8pOy50ZJS0DrHUHc",
  authDomain: "greenconnect-17d6a.firebaseapp.com",
  projectId: "greenconnect-17d6a",
  storageBucket: "greenconnect-17d6a.firebasestorage.app",
  messagingSenderId: "830611208777",
  appId: "1:830611208777:web:690c2e191bdbecb59e1d98",
  measurementId: "G-PLHDWM5V4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
