/**
 * 
 * App
 * 
 * This component is the skeleton around the actual pages and only contains code
 * which is seen on all pages
 */

import React from 'react';

import Login from '../LoginPage';
import Dashboard from '../DashboardPage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './index.css';

export default function App() {
  return (
    <div className = "app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/auth/dashboard" component={Dashboard}/>
        </Switch>
      </Router>
    </div>
  );
}