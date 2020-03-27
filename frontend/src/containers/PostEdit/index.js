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
	useLocation,
	withRouter
} from 'react-router-dom';

import './post.css';

const useQuery = location => {
	return new URLSearchParams(location.search);
};

export default class PostEditPage extends Component {
  state = {
    keywords: [],
    pageTitle: 'Create a New Thread',
    board_id: null
  }
  constructor(props) {
		super(props);
		this.query = useQuery(this.props.location);
	}
	componentDidMount() {
		if (this.query.get('post_id')) {
			let post_id = this.query.get('post_id');
			this.setState({
				pageTitle: "Edit an Existing Thread"
			});
			fetch(`/get?postid=${post_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let post = result.post;
					let comments = result.comments_information;
					console.log('post info:', post);
					
					// Set fields
					this.setState({
						title: post.post_title,
						content: post.post_content,
						keywords: ['a', 'b', 'c', 'd', 'e'],
						board_id: post.board_id
					});
				},
				(error) => {
					console.log('[ERROR: CANT LOAD POSTS INTO BOAD]', error);
				}
			)
		} else {
			this.setState({
				board_id: this.query.get('board_id')
			});
		}
	}
  handleSubmit = () => {
    const body = {
      title: this.state.title,
      content: this.state.content,
      keywords: this.state.keywords,
      email: localStorage.getItem('email'),
      boardid: this.state.board_id
    }
    console.log(body);
    if (this.query.get('post_id')) {
    	let postid = this.query.get('post_id');
    	fetch(`/forum/edit?type=post&postid=${postid}`, {
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
    } else {
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
      content: e.target.value
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
  handleEditMode() {
  	this.setState({
  		pageTitle: 'Edit an Existing Thread'
  	});
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
