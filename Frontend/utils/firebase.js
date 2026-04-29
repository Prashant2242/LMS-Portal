// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "login-3a7e7.firebaseapp.com",
  projectId: "login-3a7e7",
  storageBucket: "login-3a7e7.firebasestorage.app",
  messagingSenderId: "454857354896",
  appId: "1:454857354896:web:ac8a2ab6279f2b3e82f215",
  measurementId: "G-KM5QJ2S2E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth =getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}