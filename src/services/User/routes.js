import { createBrowserRouter,  } from "react-router-dom";
import React from "react";
import App from "../../App";
import useAuth from "../../components/Hooks/useAuth";
import Signup from "../../pages/user/Signup/Signup";
import Home from "../../pages/user/Home/Home";
import Login from "../../pages/user/Login/Login";
import Profile from "../../pages/user/Profile/Profile";
import EmailVerificationForm from "../../components/User/OTP/OTP";
import OtherProfile from "../../pages/user/OtherProfile/OtherProfile";
import Explore from "../../pages/user/Explore/Explore";
import Chat from "../../pages/user/Messenger/Messenger";
import Error from "../../components/User/Error/Error";

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<Error/>,
        children:[
            {
                path: "/",
                element: <Home />,
            },
            {
                path:'/profile',
                element:<Profile/>
            },
            {
                path:'/user/:userId',
                element:<OtherProfile/>
            },
            {
                path:'/explore',
                element:<Explore/>
            },
            {
                path:'/chat',
                element:<Chat/>
            }
        ],
      
    },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Signup/>
      },
      {
        path:'/otp',
        element:<EmailVerificationForm/>
      },
      
])