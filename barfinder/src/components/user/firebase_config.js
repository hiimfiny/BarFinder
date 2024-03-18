// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: process.env.FIREBASE_AUTH_API_KEY,
  apiKey: "AIzaSyBa4JLDJ3KshEXyrXVXZtuE-56cGWBx_Qc",
  authDomain: "barfinder-2adae.firebaseapp.com",
  projectId: "barfinder-2adae",
  storageBucket: "barfinder-2adae.appspot.com",
  messagingSenderId: "967792248909",
  appId: "1:967792248909:web:e6526781fe6235e421b404",
  measurementId: "G-SN8V7MZ3CZ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }
