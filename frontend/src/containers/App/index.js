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
import PostPage from '../PostPage';
import Comment from '../CommentEdit';
import PostView from '../PostView';
import PostEditPage from '../PostEdit';
import CommentEditPage from '../CommentEdit';
import BoardsPage from '../BoardsPage';
import BoardPage from '../BoardPage';
import PostSearchPage from '../PostSearchPage';

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
          <Route path="/boards" component={BoardsPage}/>
          <Route path="/board" component={BoardPage}/>
          <Route path="/post" component={PostPage}/>
          <Route path="/search" component={PostSearchPage}/>
          <Route path="/forum/create" component={PostEditPage}/>
          {/*
          DEBUG:
          Temporarily remove these two paths as they don't make sense with
          our URL scheme
          */}
        </Switch>
      </Router>
    </div>
  );
}
