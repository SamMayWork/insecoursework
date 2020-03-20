import React from "react";
import LikeButton from "../LikeButton";

import "./index.css";

const DataCard = props => {
  return (
    <div className="comment">
      <div className="comment_title">
        {props.link1}
      </div>
      <div className = "comment_info">
        <div className="comment_summary">
          <div className="comment_author">
            {props.link2}
          </div>
          <div className="comment_replies">
          	{props.link3}
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

export default DataCard;