import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePassword, sendForgotOtp, verifyForgotOtp } from '../../../services/User/apiMethods';
import { useNavigate } from 'react-router-dom';
const ForgotPasswordForm = () => {
  const [showOTPField, setShowOTPField] = useState(false);
  const [showPassField, setShowPassField] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate()
  // Password validation function
  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Please include a valid email address');
      return;
    }
    sendForgotOtp(email)
      .then(() => setShowOTPField(true))
      .catch(() => setEmailError('User Not Found Please Register'));
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    if (!otp) {
      setOtpError('Please enter the OTP sent to your email');
      return;
    }
    verifyForgotOtp(email, otp)
      .then((response) => {
        if (response.status) {
          setShowPassField(true);
        } else {
          setOtpError('Invalid OTP');
        }
      })
      .catch(() => setOtpError('Invalid OTP'));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(password)) {
        setError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
        return;
      }else{
        setError('')
      }
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.');
      return;
    }
 
    changePassword(email,password)
    .then((res)=>{
        navigate('/login')
    })
    .catch((err)=>{
       setError('something went wrong')
    })
   
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-900">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <Link to="/login" className="text-blue-600 decoration-2 hover:underline font-medium">
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form
              onSubmit={
                showPassField
                  ? handleSubmitPassword
                  : showOTPField
                  ? verifyOTP
                  : handleResetPassword
              }
            >
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  {emailError && !showOTPField && (
                    <p className="text-xs text-red-600 mt-2" id="email-error">
                      {emailError}
                    </p>
                  )}
                </div>
                {showOTPField && (
                  <div>
                    <label htmlFor="otp" className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <input
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        id="otp"
                        name="otp"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="otp-error"
                      />
                    </div>
                    {otpError && !showPassField && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {otpError}
                      </p>
                    )}
                  </div>
                )}
                {showPassField && (
                  <div>
                    <label htmlFor="password" className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      New password
                    </label>
                    <div className="relative">
                      <input
                        onChange={handlePasswordChange}
                        type="password"
                        id="password"
                        name="password"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="password-error"
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {error}
                      </p>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  {showPassField ? 'Submit Password' : showOTPField ? 'Verify OTP' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;
