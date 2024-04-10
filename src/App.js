// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './components/Hooks/useAuth'; // Import the custom hook
import useAdmin from './components/Hooks/useAdmin';
import Signup from './pages/user/Signup/Signup';
import Home from './pages/user/Home/Home';
import Login from './pages/user/Login/Login';
import Profile from './pages/user/Profile/Profile';
import EmailVerificationForm from './components/User/OTP/OTP';
import AdminLogin from './pages/admin/Login/adminLogin';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import OtherProfile from './pages/user/OtherProfile/OtherProfile';
import Reports from './pages/admin/Reports/Reports';
import Explore from './pages/user/Explore/Explore';
import Chat from './pages/user/Messenger/Messenger';
import KycVerifications from './pages/admin/Verifications/Verification';

function App() {
  const user = useAuth(); // Get user object from Redux state
  const admin = useAdmin();

  return (
    <>
      <Router>
        <div className='container-fluid w-100'>
          <Routes>
            <Route path='/'

              element={user ? <Home /> : <Navigate to='/login' />} />
            <Route
              path='/register'
              element={user ? <Navigate to='/profile' /> : <Signup />}
            />
            <Route
              path='/login'
              element={user ? <Navigate to='/' /> : <Login />}
            />
            <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to='/login' />}
            />
            <Route path='/otp' element={<EmailVerificationForm />} />

            <Route path='/user/:userId' element={<OtherProfile />} />

            <Route path='/explore' element={<Explore />} />

            <Route path='/chat' element={<Chat />} />

            <Route path='/admin' element={<AdminLogin />} />
            <Route
              path='/admin/dashboard'
              element={admin && admin.role === 'Admin' ? <Dashboard /> : <Navigate to='/admin' />}
            />

            <Route
              path='/admin/reports'
              element={admin && admin.role === 'Admin' ? <Reports /> : <Navigate to='/admin' />}
            />

            <Route
              path='/admin/kyc'
              element={admin && admin.role === 'Admin' ? <KycVerifications/> : <Navigate to='/admin' />}
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
