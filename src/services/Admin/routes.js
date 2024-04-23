// src/components/AdminRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../../pages/admin/Login/adminLogin';
import Dashboard from '../../pages/admin/Dashboard/Dashboard';
import Reports from '../../pages/admin/Reports/Reports';
import UserList from '../../pages/admin/UserList.jsx/UserList';
import KycVerifications from '../../pages/admin/Verifications/Verification';
import ErrorBoundary from '../../components/User/Error/ErrorBoundary';
import Error from '../../components/User/Error/Error';
const AdminRoutes = ({ admin }) => (

  <ErrorBoundary>
  <Routes>
   
    <Route path='/' element={admin && admin.role=='Admin' ? <Navigate to='/admin/dashboard'/> : <AdminLogin /> } />
    <Route
      path='/userlist'
      element={admin && admin.role === 'Admin' ? <UserList /> : <Navigate to='/admin' />}
    />
    <Route
      path='/dashboard'
      element={admin && admin.role === 'Admin' ? <Dashboard /> : <Navigate to='/admin' />}
    />
    <Route
      path='/reports'
      element={admin && admin.role === 'Admin' ? <Reports /> : <Navigate to='/admin' />}
    />
    <Route
      path='/kyc'
      element={admin && admin.role === 'Admin' ? <KycVerifications/> : <Navigate to='/admin' />}
    />
   <Route path='*' element={<Error />} />
  </Routes>
  </ErrorBoundary>
);

export default AdminRoutes;
