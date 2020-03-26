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
  Select,
  TextField,
  TextArea,
  Button,
  Chip
} from '@material-ui/core';
import {
	useLocation
} from 'react-router-dom';

import './post.css';

const useQuery = location => {
	return new URLSearchParams(location.search);
};

export default class PostEditPage extends Component {
  state = {
    keywords: [],
    pageTitle: 'Create a New Thread'
  }
  constructor(props) {
		super(props);
		this.query = useQuery(this.props.location);
	}
  handleSubmit = () => {
    const body = {
      title: this.state.titleContent,
      content: this.state.bodyContent,
      keywords: this.state.keywords,
      email: localStorage.getItem('email'),
      boardid: this.query.get('board_id')
    }
    console.log(body);
    fetch("/forum/create?type=post", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(body)
    })
    .catch((error) => console.log(error));
  }
  //Send to server
  //confirmation of post success
  //redirect user to post page if succesaful
  //if failure, display error
  handleTitleChange = (e) => {
    let val = e.target.value.trim(); 
    if(val.length > 0 && val.length <= 50) {
      this.setState({
        titleContent: e.target.value
      });
    }
  }

  handleBodyChange = (e) => {
    this.setState({
      bodyContent: e.target.value
    });
  }

  
  handleKeyWordChange = (e) => {
    if (e.keyCode == 13 || e.keyCode == 32) {
      let val = e.target.value.trim(); 
      
      console.log(val)

      if((!this.state.keywords.includes(val)) && (val.length > 0 && val.length <= 30) && this.state.keywords.length < 5) {
        let joined = this.state.keywords.concat(val);
        this.setState({
          keywords: joined
        });
      }
      console.log(this.state.keywords)
      e.target.value = ''; 
    }
  }
  handleDeleteKeyword(keyword) {
    this.setState({
      keywords: this.state.keywords.filter((chip) => chip !== keyword)
    })
    console.log(this.state.keywords)
  }
  render() {
    return (
      <div><BackBar
      title = {this.state.pageTitle}
      />
      <div className="postPage">
      
      <FormControl fullWidth>
        <TextField
          autoFocus
          margin="dense"
          id="postTitle"
          type="text"
          label="Title"
          onChange={this.handleTitleChange}
          inputProps={{ maxLength: 50 }}
          value={this.state.title}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="postTitle"
          type="text"
          label="Keywords"
          onKeyDown={this.handleKeyWordChange}
          inputProps={{ maxLength: 30 }}
          fullWidth

        />
        <div>
          {
            this.state.keywords.map((keyword, i) => 
              <Chip
                key={keyword}
                color="primary"
                label={keyword}
                onDelete={() => this.handleDeleteKeyword(keyword)}
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
          value={this.state.content}
          rows="10"
          inputProps={{ maxLength: 1500 }}
        />
        <Button onClick={this.handleSubmit} color="primary">
          Confirm
        </Button>
      </FormControl>
      </div></div>
    );
  }
}
