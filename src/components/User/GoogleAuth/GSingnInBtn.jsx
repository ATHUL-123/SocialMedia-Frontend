// GSingnInBtn.js

import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { GoogleLogin } from '../../../features/auth/authSlice';
import { auth, provider } from './FireBaseConfig';

function GSingnInBtn() {
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const response = await dispatch(GoogleLogin({ email: data.user.email }));
      if (response.payload.status === 200) {
        toast.success(response.payload.message);
      } else {
        toast.error(response.payload);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <button onClick={handleClick} className="px-14 py-1 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Login with Google</span>
      </button>
    </div>
  );
}

export default GSingnInBtn;
