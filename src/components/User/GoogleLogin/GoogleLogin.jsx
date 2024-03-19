import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleLoginButton = () => {
  const onSuccess = async (response) => {
    console.log('insideeeeeeeeeeeee');
    try {

     
      const res = await axios.post('/auth/google', { tokenId: response.tokenId });
      console.log(res.data); // Handle response from backend
    } catch (error) {
      console.error('Google Sign-dfakjdshfha failed:', error);
    }
  };

  const onFailure = (error) => {
    console.error('Google Sign-In failed:', error);
  };

  return (
    <GoogleLogin
      clientId='824924017182-j3bt9bibi5anagu9h38ak8uqqpb56r3e.apps.googleusercontent.com'
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
