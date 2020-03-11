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
  TextField,
  Button
} from '@material-ui/core';
import Comment from '../../components/Comment';


import './commentedit.css';


export default class CommentEditPage extends Component {



handleSubmit = () => {
  const body = {
    content: this.state.bodyContent,
    postid: 1,
    userid: 1
  }


fetch("/forum/create?type=comment", {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}); 
}


  //Send to server
  //confirmation of post success
  //redirect user to post page if succesaful
  //if failure, display error







handleBodyChange = (e) => {
  this.setState({
    bodyContent: e.target.value
  }, () => {
    console.log('[Body CONTENT]:', this.state.bodyContent);
  });
}



render() {
  return (
    <div class="postPage">

  <FormControl fullWidth>
      <Comment
        text=""
        author="author"
        date={new Date().toLocaleDateString()}
      />
      <TextField
        autoFocus
        margin="dense"
        id="postTitle"
        type="text"
        onChange={this.handleBodyChange}
        fullWidth
      />

      <Button onClick={this.handleSubmit} color="primary">
        Confirm
      </Button>
    </FormControl>
    </div>
  );
}
}


