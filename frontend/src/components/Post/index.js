import React, { useState } from "react";

import Rating from '../Rating';

import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';

import {
  Checkbox,
  CardHeader,
  Button,
  TextField,
  List,
  ListItem,
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
} from '@material-ui/core';

import "./index.css";

/*
const PostOptions = props => {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
    setOpen(false);
  }
	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>
				{"Delete account?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
				  Please type your email address to confirm.
				</DialogContentText>
				<FormControl fullWidth>
				  <InputLabel shrink htmlFor="age-native-label-placeholder">
				    Keep Info
				  </InputLabel>
				  <Select
				    fullWidth
				    inputProps={{
				      name: 'age',
				      id: 'age-native-label-placeholder',
				      defaultValue: 'Keep Info'
				    }}
				  >
				    <MenuItem value="Keep Info">Keep Info</MenuItem>
				    <MenuItem value="Delete Info">Delete Info</MenuItem>
				  </Select>
				  <TextField
				    autoFocus
				    margin="dense"
				    id="email"
				    type="email"
				    label="Email Address"
				    onChange={this.handleEmailChange}
				    fullWidth
				  />
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={this.handleClose} color="primary">
				  Cancel
				</Button>
				<Button disabled={this.state.confirmButtonDisabled} onClick={this.handleClose} color="primary">
				  Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};
*/

const Post = props => {
  return (
    <div className="comment">
    	<div className="comment_top">
		    <div className="comment_title">
		      {props.title}
		    </div>
		    <div className="comment_options">
		    	{/*<PostOptions/>*/}
		    </div>
      </div>
      <div className = "comment_content">
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
}

Post.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	likes: PropTypes.number.isRequired,
	creationDate: PropTypes.number.isRequired,
};

export default Post;
