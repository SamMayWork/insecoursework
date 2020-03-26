import React from "react";
import Rating from "../Rating";

import PropTypes from 'prop-types';

import "./index.css";

const Comment = props => {
  return (
    <div className="comment">
    	<div className = "comment_content">
      	{props.content}
      </div>
      <div className = "comment_info">
        <div className="comment_summary">
          <div className="comment_author">
            {props.author}
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

Comment.propTypes = {
	content: PropTypes.string.isRequired,
	likes: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired
};

export default Comment;
