import React from "react";
import LikeButton from "../LikeButton";

import "./index.css";

function Comment(props) {
  return (
    <div className="comment">
      <div className="comment_title">
        {/*{props.text}*/}
      </div>
      <div className = "comment_info">
        <div className="comment_summary">
          <div className="comment_author">
            {props.author}
          </div>
          <div className="comment_replies">
          {new Date(props.date).toLocaleDateString()}
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

export default Comment;