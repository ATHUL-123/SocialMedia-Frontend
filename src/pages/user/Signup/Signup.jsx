import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sentOtp } from '../../../services/User/apiMethods';
import { Link } from 'react-router-dom';
import { setReduxUser } from '../../../features/auth/authSlice';

const SignupWithDesign = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Username is required')
            .min(4, 'Username must be at least 4 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            await sentOtp(values);
            navigate('/otp');
            toast.success('Otp Sent successfully');
            dispatch(setReduxUser(values));
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMessage);
        }
        setSubmitting(false);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <Formik initialValues={{ userName: '', email: '', phone: '', password: '', password2: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="w-full max-w-md">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                            </div>
                            <section className="form">
                                <Field type="text" name="userName" placeholder="Username" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 mb-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <ErrorMessage name="userName" component="div" className="error-message text-red-500" />
                                <Field type="email" name="email" placeholder="Email address" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 mb-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <ErrorMessage name="email" component="div" className="error-message text-red-500" />
                                <Field type="text" name="phone" placeholder="Phone" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 mb-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <ErrorMessage name="phone" component="div" className="error-message text-red-500" />
                                <Field type="password" name="password" placeholder="Password" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 mb-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <ErrorMessage name="password" component="div" className="error-message text-red-500" />
                                <Field type="password" name="password2" placeholder="Confirm Password" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 mb-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                <ErrorMessage name="password2" component="div" className="error-message text-red-500" />
                                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </section>

                            <div className="mt-6 text-center ">
                                <Link to="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Already have an account?
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </section>
    );
};

export default SignupWithDesign;
