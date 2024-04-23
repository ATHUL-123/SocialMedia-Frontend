// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './components/Hooks/useAuth';
import useAdmin from './components/Hooks/useAdmin';
import AuthRoutes from './services/User/routes';
import AdminRoutes from './services/Admin/routes';
import ServerError from './components/User/Error/ServerError';

function App() {
  const user = useAuth();
  const admin = useAdmin();

  return (
    <Router>
      <div className='container-fluid w-100'>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes admin={admin} />} />
          <Route path='/*' element={<AuthRoutes user={user} />} />
          <Route path='/error' element={<ServerError/>}/>
          
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
