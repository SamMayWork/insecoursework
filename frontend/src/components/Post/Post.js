import React, {Component} from "react";
import LikeButton from "./LikeButton";

function Post(props) {
  return (
    <div className="post">
      <div className="post_title">
        {props.title}
      </div>
      <div className = "post_info">
        <div className="post_summary">
          <div className="post_author">
            /u/{props.author}
          </div>
          <div className="post_replies">
            {props.replies} Comments
          </div>
        </div>
        <div className="post_stats">
          <div className="post_likes">
            <LikeButton/>
          </div>
          <div className="post_date">
            {new Date(props.date).toLocaleDateString()}
          </div>
        </div>
      </div>
     </div>
  );
}

export default Post;