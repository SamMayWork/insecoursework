/**
 * 
 * LoginPage
 * 
 * This is the first thing users of our App, at the '/' route
 */

import React from 'react';
import GoogleLogin from 'react-google-login';

const clientID = "817279853236-n8lmn3pt96j7q4uh61ulgb7alnqgc1t8.apps.googleusercontent.com";

const responseGoogle = (response) => {
  console.log(response);
}

export function LoginPage() {
  return (
    <GoogleLogin
      clientId={clientID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default LoginPage;