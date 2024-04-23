// src/components/AuthRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/user/Home/Home';
import Signup from '../../pages/user/Signup/Signup';
import Login from '../../pages/user/Login/Login';
import Profile from '../../pages/user/Profile/Profile';
import EmailVerificationForm from '../../components/User/OTP/OTP';
import OtherProfile from '../../pages/user/OtherProfile/OtherProfile';
import Explore from '../../pages/user/Explore/Explore';
import Chat from '../../pages/user/Messenger/Messenger';
import VideoCall from '../../pages/user/VideoCall/VideoCall';
import Error from '../../components/User/Error/Error';
import ErrorBoundary from '../../components/User/Error/ErrorBoundary';

const AuthRoutes = ({ user }) => (
  
  <Routes>

    <Route path='/' element={user ? <Home /> : <Navigate to='/login'/>} />
    <Route path='/register' element={ <Signup />} />
    <Route path='/login' element={user ? <Navigate to='/'/> :<Login />} />
    <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
    <Route path='/otp' element={<EmailVerificationForm />} />
    <Route path='/user/:userId' element={<OtherProfile />} />
    <Route path='/explore' element={<Explore />} />
    <Route path='/chat'element={user ? <Chat /> : <Navigate to='/login' />} />
    <Route path='/room/:roomId' element={user ?<VideoCall/>: <Navigate to='/login' />}/>
    <Route path='*' element={<Error />} /> {/* Fallback route for 404 */}
   
   
  </Routes>
  
);

export default AuthRoutes;
