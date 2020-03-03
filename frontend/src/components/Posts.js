import React, {Component} from "react";

function Posts(props) {
  return(
    <div className = "posts">
      {props.children}
    </div>
  );
}

export default Posts;