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
import {
	useLocation
} from 'react-router-dom';

import './commentedit.css';

const useQuery = (location) => {
	return new URLSearchParams(location.search);
};

export default class CommentEditPage extends Component {
	constructor(props) {
		super(props);
		this.query = useQuery(this.props.location);
	}
	state = {
		pageTitle: "Create a new comment",
		reply: null
	}
	componentDidMount() {
		this.updateReply(this.query.get('reply_id'));
	}
	updateReply = reply_id => {
		fetch(`/get?commentid=${reply_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let reply = result;
					console.log('reply:', reply[0]);
					this.setState({
						reply: reply[0]
					});
				},
				(error) => {
					console.log('[ERROR: CANT LOAD COMMENT WHICH IS BEING REPLIED TO]', error);
				}
			)
	};
	/*
	handleReply = () => {
		fetch("/get?commentid=[id]", {
		  method: 'POST',
		  mode: 'cors',
		  cache: 'no-cache',
		  credentials: 'same-origin',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  // body: JSON.stringify(body)
		}) 
	}
	*/
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
	handleBodyChange = (e) => {
		this.setState({
		  bodyContent: e.target.value
		}, () => {
		  console.log('[Body CONTENT]:', this.state.bodyContent);
		});
	}
render() {
	let reply = null;
	if (this.state.reply !== null) {
		reply = (
			<Comment
				content={this.state.reply.comment_content}
			/>
		);
	}
	return (
	<div>
		<BackBar title = {this.state.pageTitle}/>
		<div className="postPage">
			<FormControl fullWidth>
				{reply}
				<TextField
				autoFocus
				margin="dense"
				id="postTitle"
				type="text"
				label="Comment"
				onKeyDown={this.handleBodyChange}
				inputProps={{ maxLength: 2000 }}
				fullWidth
				/>
				<Button onClick={this.handleSubmit} color="primary">Confirm</Button>
			</FormControl>
		</div>
	</div>
	)
}
}
