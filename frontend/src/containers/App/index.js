/**
 * 
 * App
 * 
 * This component is the skeleton around the actual pages and only contains code which is seen on all pages
 */

import React from 'react';

import Login from '../LoginPage';
import Dashboard from '../DashboardPage';
import Account from '../AccountPage';
import Post from '../PostPage';
import Comment from '../CommentEdit';
import PostView from '../PostView';
import PostEditPage from '../PostEdit';
import ModulesPage from '../ModulesPage';

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
          <Route path="/account" component={Account}/>
          <Route path="/comment" component={Comment}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/modules" component={ModulesPage}/>
          <Route path="/post" component={Post}/>
          {/*
          DEBUG:
          Temporarily remove these two paths as they don't make sense with
          our URL scheme
          <Route path="/PostEdit" component={PostEditPage}/>
          <Route path="/postview" component={PostView}/>
          *}
        </Switch>
      </Router>
    </div>
  );
}
