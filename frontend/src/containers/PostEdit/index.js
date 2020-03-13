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
  Button,
  Chip
} from '@material-ui/core';


import './post.css';


export default class PostEditPage extends Component {
state = {
  keywords: []
}
handleSubmit = () => {
  const body = {
    title: this.state.titleContent,
    content: this.state.bodyContent,
    keywords: this.state.keywords
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

handleKeyWordChange = (e) => {
  if (e.keyCode == 13 || e.keyCode == 32) {
    let joined = this.state.keywords.concat(e.target.value);
    if(joined.length <= 5) {
      this.setState({
        keywords: joined
      });
    } else {
      return;
    }
    e.target.value = '';
    }
    
}


handleDeleteKeyword(val) {
  console.log(val);
}

render() {
  return (
    <div className="postPage">
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
        onKeyDown={this.handleKeyWordChange}
        fullWidth
      />
      <div>
        {
          this.state.keywords.map((keyword, i) => 
            <Chip
              key={i}
              color="primary"
              label={keyword}
              onDelete={this.handleDeleteKeyword}
            />
          )
        }
      </div>
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


