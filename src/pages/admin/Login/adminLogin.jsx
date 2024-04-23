import React, { useState } from 'react';
import { adminLogin } from '../../../services/Admin/apiMethods';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../../features/admin/adminSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
function AdminLogin() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const { admin } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (admin) {
            navigate('/admin/dashboard')
        }
    }, [navigate, admin])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        adminLogin(data)
            .then((response) => {
                toast.success(response.message);
            
                dispatch(setAdmin(response.admin))
                navigate('/admin/dashboard')
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>

                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Admin Login</h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Social Media</p>

                    <form>
                        <div className="w-full mt-4">
                            <input
                                onChange={(e) => setEmail(e.target.value)}

                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
}

export default AdminLogin;
