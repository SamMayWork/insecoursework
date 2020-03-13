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
import List from '../../components/List';
import Comment from '../../components/Comment';
import Navbar from '../../containers/Navbar';


import './commentedit.css';


export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }
  render() {
    const {error, isLoaded, comments } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      console.log(comments);
      return (
        <div className = "dashboardPage">
          <Navbar/>
          <List>
            {comments.map((comment, i) => (
              <Comment
                key = {i}
                title = {comment.title}
                author = {comment.author}
                replies = {comment.replies}
                date = {comment.date}
              />
            ))}
          </List>
        </div>
      );
    }
  }
  componentDidMount() {
    fetch("https://www.localhost:8080/get?postid=11f3b99f")
      .then(res => res.json())
      .then(
        (result) => {
          let comments = [];
          result.data.children.forEach((comment) => {
            let commentData = comment.data;
            let commentObj = {
              title: commentData.title,
              author: commentData.author,
              replies: commentData.num_comments,
              date: commentData.created * 1000
            };
            comments.push(commentObj);
          })
          this.setState({
            isLoaded: true,
            comments: comments
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}