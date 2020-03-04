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
import Button from '../../components/Button';

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
        {/*<Route path="/home" component={Account}/>*/}
        {/*<Route path="/thread" component={postEdit}/>*/}
        {/*<Route path="/postEdit" component={postEdit}/>*/}
        {/*<Route path="/commentEdit" component={commentEdit}/>*/}
        {/*<Route path="/account" component={Account}/>*/}
      </Switch>
    </Router>
  );
}