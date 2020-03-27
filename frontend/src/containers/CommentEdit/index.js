/**
 * 
 * Comment Edit/Add Page
 * 
 * Create a comment for the system (or edit comment made by logged in user)
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

import Comment from '../../components/Comment';

import './comment.css';

const useQuery = location => {
	return new URLSearchParams(location.search);
};

export default class CommentEditPage extends Component {
  state = {
    keywords: [],
    pageTitle: 'Create a New Comment',
    post_id: null,
    reply: null
  }
  constructor(props) {
		super(props);
		this.query = useQuery(this.props.location);
	}
	componentDidMount() {
		if (this.query.get('replyid')) {
			let comment_id = this.query.get('replyid');
			this.setState({
				pageTitle: "Reply to Comment"
			});
			/*
			fetch(`/get?commentid=${comment_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let comment = result.comment;
					let comments = result.comments_information;
					console.log('comment info:', comment);
					
					// Set fields
					console.log('comment:', comment);
					this.setState({
						title: comment.comment_title,
						content: comment.comment_content,
						keywords: ['a', 'b', 'c', 'd', 'e'],
						post_id: comment.post_id
					});
				},
				(error) => {
					console.log('[ERROR: CANT LOAD POSTS INTO BOARD]', error);
				}
			)
			*/
		} else {
			this.setState({
				post_id: this.query.get('postid')
			});
		}
	}
  handleSubmit = () => {
    if (this.query.get('replyid')) {
    	const body = {
		    content: this.state.content,
		    email: localStorage.getItem('email'),
		    postid: this.query.get('postid'),
		    replyid: this.query.get('replyid'),
		    reply: true
		  }
		  console.log(body);
    	let parentid = this.query.get('replyid');
    	fetch(`/forum/create?type=comment`, {
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
    	const body = {
		    content: this.state.content,
		    email: localStorage.getItem('email'),
		    postid: this.state.post_id
		  }
    	fetch(`/forum/create?type=comment`, {
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
  //confirmation of comment success
  //redirect user to comment page if succesaful
  //if failure, display error
  handleTitleChange = (e) => {
    let val = e.target.value.trim(); 
    if(val.length > 0 && val.length <= 50) {
      this.setState({
        title: e.target.value
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
		let reply = null;
		/*
		fetch(`http://localhost:3000/get?commentid=${this.query.get('comment_id')}`)
			.then((x) => {
				console.log(x);
				this.setState({
					reply: x
				});
			});
			
		if (this.query.get('reply_id')) {
			reply = 
			<Comment
				title = {"Example"}
			/>
  	};
  	*/
  	
    return (
      <div><BackBar
      title = {this.state.pageTitle}
      />
      <div className="commentPage">
		    <FormControl fullWidth>
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
		      <TextField className="commentBody"
		        autoFocus
		        margin="dense"
		        id="commentTitle"
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
