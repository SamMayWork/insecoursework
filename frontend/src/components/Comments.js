import React, {Component} from "react";

function Comments(props) {
  return(
    <div className = "comments">
      {props.children}
    </div>
  );
}

export default Comments;