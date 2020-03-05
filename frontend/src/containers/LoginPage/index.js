/**
 * 
 * LoginPage
 * 
 * This is the first thing users of our App, at the '/' route
 */

import React from 'react';
import GoogleLogin from 'react-google-login';

import './loginPage.css';

const clientID = "817279853236-n8lmn3pt96j7q4uh61ulgb7alnqgc1t8.apps.googleusercontent.com";

const responseGoogle = (response) => {
  console.log(response);
}

export function LoginPage() {
  return (
    <div className = "loginPage">
      <h1>
        UoP Forum
      </h1>
      <GoogleLogin
        buttonText="Login with Google"
        clientId={clientID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
}

export default LoginPage;