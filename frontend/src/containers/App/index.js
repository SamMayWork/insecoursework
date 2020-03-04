/**
 * 
 * App
 * 
 * This component is the skeleton around the actual pages and only contains code
 * which is seen on all pages
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Login from '../LoginPage';
import Dashboard from '../DashboardPage';

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
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  );
}