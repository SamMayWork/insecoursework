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

function responseGoogle(response, history) {
  let token = response.uc.id_token;
  console.log(response, token);
  
  // SET USER SESSION DETAILS
  localStorage.setItem('real_name', response.profileObj.name);
  localStorage.setItem('email', response.profileObj.email);
  localStorage.setItem('token', token);
  
  fetch('/auth/test', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((res) => console.log(res)).then(
    (res) => {
    	history.push('/dashboard');
    }
  )
  .catch((error) => console.log(error));
  
  /*
  // AUTH TEST
  fetch('/forum/uac?register=true', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }).then((res) => console.log(res)).then(
    (res) => {
    	history.push('/dashboard');
    }
  )
  .catch((error) => console.log(error));
  */
}

export function LoginPage(props) {
  return (
    <div className = "loginPage">
      <h1>
        UoP Forum
      </h1>
      <GoogleLogin
        buttonText="Login with Google"
        clientId={clientID}
        onSuccess={(response) => (responseGoogle(response, props.history))}
      />
    </div>
  );
}

export default LoginPage;
