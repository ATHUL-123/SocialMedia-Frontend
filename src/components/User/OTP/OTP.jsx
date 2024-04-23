import React, { useState, useEffect } from 'react';
import { verifyOtp } from '../../../services/User/apiMethods';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sentOtp } from '../../../services/User/apiMethods';
import { setReduxUser } from '../../../features/auth/authSlice';

const EmailVerificationForm = () => {
  const dispatch  = useDispatch()
  const { unVarified } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  });
  const [timer, setTimer] = useState(60); // Initial timer value set to 60 seconds
  const [timeOutMsg,setTimeOutMsg] =useState(false)
 
  const ResendOtp=()=>{
    setTimeOutMsg(false)
    setTimer(60)
    sentOtp(unVarified)
    .then((response) => {
        toast.success('Otp Sent successfully');
        dispatch(setReduxUser(response))
    })
    .catch((error) => {
        const { message } = error.response.data;
        toast.error(message)
    });
  }



// Countdown timer effect
useEffect(() => {
  const countdown = setInterval(() => {
    setTimer((prevTimer) => prevTimer - 1);
    if (timer < 1) {
      clearInterval(countdown);
      setTimeOutMsg(true)
    }
  }, 1000); // Update every second

  // Cleanup function
  return () => clearInterval(countdown);
}, [timer,ResendOtp]); // Added timer as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine OTP digits into a single string
    const otpCode = Object.values(otp).join('');
 
    verifyOtp(unVarified.email, otpCode)
      .then((response) => {
        toast.success('success');
  
        navigate('/login');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log('error');
      });
  };



  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
            <div className="text-sm font-medium text-gray-400">
         {timeOutMsg ? <p className='text-danger text-red'>OTP Expired</p> :     <p>OTP Expires in: {timer} seconds</p>}
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name={`digit${index}`}
                        id={`digit${index}`}
                        maxLength="1"
                        value={otp[`digit${index}`]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" type="submit">
                      Verify Account
                    </button>
                  </div>
                 
                </div>
              </div>
            </form>
            {timeOutMsg ? 
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                   <button
                   onClick={ResendOtp}
                      className="flex flex-row items-center text-blue-600"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </button>
                  </div>  : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationForm;
