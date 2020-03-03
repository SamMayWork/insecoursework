import React, {Component} from "react";
import LikeButton from "./LikeButton";

function Comment(props) {
  return (
    
    <div className="post">


      <div className="post_title">
        {/*{props.text}*/}
      </div>
      <div className = "post_info">
        <div className="post_summary">
          <div className="post_author">
            {props.author}
          </div>
          <div className="post_replies">
          {new Date(props.date).toLocaleDateString()}
          </div>
          <div className="post_stats">
          <div className="post_likes">
            <LikeButton/>
          </div>  
          </div>
        </div>

      </div>
     </div>
  );
}

export default Comment;