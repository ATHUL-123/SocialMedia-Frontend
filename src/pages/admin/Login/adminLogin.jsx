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
        email: Yup.string().required('Email is required').email('Invalid email'),
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

    const handleSubmit = (values, { setSubmitting }) => {
        adminLogin(values)
          .then((response) => {
            toast.success(response.message);
            dispatch(setAdmin(response.admin));
            navigate('/admin/dashboard');
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      };



    return (
        <body className="antialiased bg-gradient-to-br from-blue-300 to-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <div>
              {/* SVG should be replaced with ReactComponent */}
              <svg
                className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h1 className="text-5xl text-gray-800 font-bold">Admin Area</h1>
            <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
              Control and monitorize your website data from dashboard.
            </p>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">Sign In</h2>
                {/* Wrap the form with Formik */}
                <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full">
                    <div id="input" className="flex flex-col w-full my-5">
                      <label htmlFor="username" className="text-gray-500 mb-2">Email</label>
                      {/* Use Field component for form inputs */}
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Please insert your email"
                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      />
                      {/* Display form errors if any */}
                      <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />

                    </div>
                    <div id="input" className="flex flex-col w-full my-5">
                      <label htmlFor="password" className="text-gray-500 mb-2">Password</label>
                      {/* Use Field component for form inputs */}
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Please insert your password"
                        className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      />
                      {/* Display form errors if any */}
                      <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                    </div>
                    <div id="button" className="flex flex-col w-full my-5">
                      {/* Use Formik's handleSubmit method */}
                      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-blue-600 rounded-lg text-blue-100">
                        <div className="flex flex-row items-center justify-center">
                          <div className="mr-2">
                            {/* SVG should be replaced with ReactComponent */}
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              ></path>
                            </svg>
                          </div>
                          <div className="font-bold">Sign In</div>
                        </div>
                      </button>
                      <div className="flex justify-evenly mt-5">
                        <a href="#" className="w-full text-center font-medium text-gray-500">Recover password!</a>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </body>
    );
}

export default AdminLogin;
