
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDoOFvQLsNjmpGNHWPO3vlh9m0v1qlVbpI",
  authDomain: "socialmedia-c867d.firebaseapp.com",
  projectId: "socialmedia-c867d",
  storageBucket: "socialmedia-c867d.appspot.com",
  messagingSenderId: "609519658826",
  appId: "1:609519658826:web:a5b1c4b80d4209af9603b3",
  measurementId: "G-G1NEJM19L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}
