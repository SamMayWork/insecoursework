/**
 * 
 * LoginPage
 * 
 * This is the first thing users of our App, at the '/' route
 */

import React from 'react';
import GoogleLogin from 'react-google-login';

import './loginPage.css';

const clientID = "817279853236-toe6rfq5ebg7rife6fvd82hh0eclpt3t.apps.googleusercontent.com";

function responseGoogle(response) {
  let token = response.uc.id_token;
  console.log(response, token);
  fetch('/auth/test', {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((res) => console.log(res)).then(
    (res) => console.log(res)
  );
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
      />
    </div>
  );
}

export default LoginPage;