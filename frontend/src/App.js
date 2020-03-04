import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/about" component={About}/>
        </Switch>
    </Router>
  );
}

function Login() {
  return <div>Login</div>;
}

function About() {
  return <div>About</div>;
}