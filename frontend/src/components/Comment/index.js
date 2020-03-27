import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import Rating from '../Rating';

import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';

import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	MoreVert as OptionsIcon,
	Report as ReportIcon,
	VisibilityOff as HideIcon
} from '@material-ui/icons';

import {
	Icons,
  Checkbox,
  CardHeader,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core';

import "./index.css";

// NOTE: HIDE AUTHOR OPTIONS IF THE VIEWER IS NOT THE AUTHOR
const CommentOptions = props => {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleEdit = () => {
  	setOpen(false);
  	history.push(`/forum/create?comment_id=${props.comment_id}`);
  }
  const handleDelete = () => {
  	let email = localStorage.getItem('email');
  	let token = localStorage.getItem('token');
  	let URL = `/forum/delete?commentid=${props.comment_id}&email=${email}`;
  	console.log(URL);
  	fetch(URL, {
		  credentials: 'same-origin',
		  method: 'GET',
		  headers: {
		    'Authorization': 'Bearer ' + token
		  }
		})
  		.then()
  		.catch(err => console.log(err));
  	setOpen(false);
  }
  const handleReport = () => {
  	let email = localStorage.getItem('email');
  	let token = localStorage.getItem('token');
  	let URL = `/forum/report?commentid=${props.comment_id}`;
  	console.log(URL);
  	fetch(URL, {
		  credentials: 'same-origin',
		  method: 'POST',
		  user: {
		  	email: email
		  },
		  headers: {
		    'Authorization': 'Bearer ' + token
		  }
		})
  		.then((x) => console.log(x))
  		.catch(err => console.log(err));
  	setOpen(false);
  }
	return (
		<div>
			<IconButton onClick={handleClickOpen}>
				<OptionsIcon/>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth
			>
				<List>
					<ListItem autoFocus button onClick={handleEdit}>
						<ListItemAvatar>
							<EditIcon />
						</ListItemAvatar>
						<ListItemText primary={"Edit"} />
					</ListItem>
					<ListItem autoFocus button onClick={handleDelete}>
						<ListItemAvatar>
							<DeleteIcon />
						</ListItemAvatar>
						<ListItemText primary={"Delete"} />
					</ListItem>
					<ListItem autoFocus button onClick={handleReport}>
						<ListItemAvatar>
							<ReportIcon />
						</ListItemAvatar>
						<ListItemText primary={"Report"} />
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

const CommentOverlay = props => {
	return (
		<div
			{...props}
		>
			<div className="comment_overlay">
				<HideIcon/>
				<h4>Sensitive Content</h4>
				<p>This comment contains sensitive content which some people
				may find offensive or disturbing.</p>
				<p>Click anywhere to show the comment</p>
			</div>
		</div>
	);
}

const Comment = props => {
	const history = useHistory();
	const [reported, setReported] = useState(props.reported);
	const handleOverlayClick = e => {
		setReported(false);
	}
	const handleOpenComment = () => {
		history.push(`/comment?id=${props.comment_id}`);
	}
	const content = (
		<div>
			<div className="comment_top">
				<div className="comment_title" onClick={handleOpenComment}>
				  {props.title}
				</div>
				<div className="comment_options">
					<CommentOptions
						comment_id = {props.comment_id}
					/>
				</div>
			</div>
			<div className = "comment_content" onClick={handleOpenComment}>
				{props.content}
			</div>
			<div className = "comment_info">
				<div className="comment_summary">
				  <div className="comment_author">
				    {props.author}
				  </div>
				  <div className="comment_replies">
				  	{props.replies}
				  </div>
				  <div className="comment_stats">
				    <div className="comment_likes">
				      <Rating/>
				    </div>  
				  </div>
				</div>
			</div>
		</div>
	);
	const overlay = (
		<CommentOverlay
			comment_id = {props.comment_id}
			onClick = {handleOverlayClick}
		/>
	);
  return (
    <div className="comment">
    	{reported ? overlay : content}
		</div>
  );
}

Comment.propTypes = {
	comment_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	likes: PropTypes.number.isRequired,
	creationDate: momentPropTypes.momentObj.isRequired,
	reported: PropTypes.bool.isRequired
};

export default Comment;
