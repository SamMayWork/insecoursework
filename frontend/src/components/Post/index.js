import React from "react";
import LikeButton from "../LikeButton";

import momentPropTypes from 'react-moment-proptypes';

import PropTypes from 'prop-types';

import "./index.css";

const Post = props => {
  return (
    <div className="comment">
      <div className="comment_title">
        {props.title}
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
		          <LikeButton/>
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
