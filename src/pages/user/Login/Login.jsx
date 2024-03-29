// Login.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/User/Spinner/Spinner';
import { Link } from 'react-router-dom';
import GSingnInBtn from '../../../components/User/GoogleAuth/GSingnInBtn';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading } = useSelector((state) => state.auth);

  // State to store user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError,setEmailError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [message,setMessage] = useState('')

  // To check if the user is already logged in
  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }
    if (isSuccess || user) {
      navigate('/');
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setEmailError(false);
    setPasswordError(false)
    e.preventDefault();
    try {
      const response = await dispatch(login({ email, password }));
      if (response.payload.status === 200) {
        toast.success(response.payload.message);
        navigate('/');
      } else {
        if(response.payload === 'Invalid password'){
          setPasswordError(true)
        }else{
          setEmailError(true)
        }
       
        setMessage(response.payload)
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950" style={{backgroundImage: "url('https://cdn.wallpapersafari.com/35/56/ZJcvxr.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <div className="text-red-500 text-xs mt-1">{message}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {passwordError && <div className="text-red-500 text-xs mt-1">{message}</div>}
            <a href="#" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          <GSingnInBtn />
        </form>
        <div className="flex items-center justify-between mb-2 mt-8">
          <div className="flex items-center"></div>
          <Link to="/register" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
