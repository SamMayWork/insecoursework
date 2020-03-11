/**
 * 
 * Post Edit/Add Page
 * 
 * Create a post for the system (or edit post made by logged in user)
 */

import React, {Component} from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  TextArea
} from '@material-ui/core';
import List from '../../components/List';
import Comment from '../../components/Comment';


import './post.css';


export default class PostEditPage extends Component {
 

render() {
  return (
    <FormControl fullWidth>
      <TextField
        autoFocus
        margin="dense"
        id="postTitle"
        type="text"
        label="Title"
        onChange={this.handleEmailChange}
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        id="postTitle"
        type="text"
        label="Keywords"
        onChange={this.handleEmailChange}
        fullWidth
      />
      <TextField className="postBody"
        autoFocus
        margin="dense"
        id="postTitle"
        type="text"
        multiline
        onChange={this.handleEmailChange}
        fullWidth
        rows="10"
      />
    </FormControl>
  );
}





}