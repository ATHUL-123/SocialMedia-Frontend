// Login.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/User/Spinner/Spinner';
import { Link } from 'react-router-dom';
import GSingnInBtn from '../../../components/User/GoogleAuth/GSingnInBtn';
import './Login.css'
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
 
  // // To check if the user is already logged in
  // useEffect(() => {
  //   // if (isError) {
  //   //   toast.error(message);
  //   // }
  //   if (isSuccess || user) {
  //     navigate('/');
  //   }
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

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
    <div className="relative min-h-screen flex">
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
      <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
        style={{backgroundImage: "url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"}}>
        <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
        <div className="w-full max-w-md z-10">
          <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">HYPER EDGE...</div>
          <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> What is HYPER EDGE? A social media platform that revolutionizes the way people connect and interact online. It offers a seamless user experience, empowering individuals and businesses to engage with their audience effectively.</div>
        </div>
        {/* remove custom style */}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      
     
      <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">

            <h2 className="mt-6 text-3xl font-bold text-gray-900">

              HYPER EDGE
            </h2>
            <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
          </div>
          
            <GSingnInBtn />
         
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-200"></span>
            <span className="text-gray-300 font-normal">or continue with</span>
            <span className="h-px w-16 bg-gray-200">
</span>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="relative">
              <div className="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
              <input
                className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                onChange={(e) => setEmail(e.target.value)}   value={email}  id="email" type="email" placeholder="mail@gmail.com" defaultValue="mail@gmail.com" />
                {emailError && <div className="text-red-500 text-xs mt-1">{message}</div>}
            </div>
            <div className="mt-8 content-center">
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)} value={password}  id="password"  type="password" placeholder="Enter your password" defaultValue="*****" />
                {passwordError && <div className="text-red-500 text-xs mt-1">{message}</div>}

            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-indigo-400 hover:text-blue-500">Forgot your password?</a>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Don't have an account?</span>
              <Link to="/register"  className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign
                up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
