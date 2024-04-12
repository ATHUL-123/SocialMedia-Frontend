import { createBrowserRouter,  } from "react-router-dom";
import React from "react";


import useAdmin from "../../components/Hooks/useAdmin";
import AdminLogin from "../../pages/admin/Login/adminLogin";
import Dashboard from "../../pages/admin/Dashboard/Dashboard";
import Reports from "../../pages/admin/Reports/Reports";
import KycVerifications from "../../pages/admin/Verifications/Verification";
import Error from "../../components/User/Error/Error";

export const adminRouter ={
    path:'/admin',
    element :<Dashboard/>,
    errorElement:<Error/>,
    children:[
        {
            path:'/admin',
            element:<Dashboard/>
        },
        {
            path:'/admin/reports',
            element:<Reports/>
        },
        {
            path:'/admin/kyc',
            element:<KycVerifications/>
        }
    ]
}

export const adminLoginRouter ={
    path:'/admin/login',
    element:<AdminLogin/>
}

export default adminRouter