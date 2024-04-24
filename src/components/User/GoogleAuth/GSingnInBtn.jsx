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


<div onClick={handleClick} className="flex flex-row justify-center items-center space-x-3">
<a  target="_blank" className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg bg-blue-100 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img className="w-4 h-4" src="https://cdn-icons-png.freepik.com/256/2504/2504739.png?semt=ais_hybrid" alt="Behance" /></a>

</div>
  );
}

export default GSingnInBtn;
