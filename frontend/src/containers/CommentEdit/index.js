/**
 * 
 * Post Edit/Add Page
 * 
 * Create a post for the system (or edit post made by logged in user)
 */

import React, {Component} from 'react';
import BackBar from '../../components/BackBar'
import {
  FormControl,
  InputLabel,
  TextField,
  Button
} from '@material-ui/core';
import Comment from '../../components/Comment';


import './commentedit.css';


export default class CommentEditPage extends Component {

state = {
  pageTitle: "Create a new comment",
}


//Require function to grab the post ID and the potential reply to ID
handleSubmit = () => {
  const body = {
    content: this.state.bodyContent,
    postid: 1,
    userid: 1,
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



//Function to pull data of the comment being replied to, if such
//comment is being replied to


handleBodyChange = (e) => {
  this.setState({
    bodyContent: e.target.value
  }, () => {
    console.log('[Body CONTENT]:', this.state.bodyContent);
  });
}



render() {
  return (

    <div><BackBar
      title = {this.state.pageTitle}
      />


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
          label="Comment"
          onKeyDown={this.handleBodyChange}
          inputProps={{ maxLength: 1500 }}
          fullWidth

        />
       
      
       <Button onClick={this.handleSubmit} color="primary">
        Confirm
      </Button>
      </FormControl>
      </div></div>
  );
}
}


