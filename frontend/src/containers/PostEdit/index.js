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
  TextArea,
  Button
} from '@material-ui/core';


import './post.css';


export default class PostEditPage extends Component {



handleSubmit = () => {
  const body = {
    title: this.state.titleContent,
    content: this.state.bodyContent,
    keywords: []
  }


fetch("/forum/create?type=post", {
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






 
handleTitleChange = (e) => {
  this.setState({
    titleContent: e.target.value
  }, () => {
    console.log('[TITLE CONTENT]:', this.state.titleContent);
  });
}

handleBodyChange = (e) => {
  this.setState({
    bodyContent: e.target.value
  }, () => {
    console.log('[Body CONTENT]:', this.state.bodyContent);
  });
}

handleKeyChange = (e) => {
  this.state({
    //do something at some point
  });
}



render() {
  return (
    <div class="postPage">
    <FormControl fullWidth>
      <TextField
        autoFocus
        margin="dense"
        id="postTitle"
        type="text"
        label="Title"
        onChange={this.handleTitleChange}
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
        onChange={this.handleBodyChange}
        fullWidth
        rows="10"
      />
      <Button onClick={this.handleSubmit} color="primary">
        Confirm
      </Button>
    </FormControl>
    </div>
  );
}
}


