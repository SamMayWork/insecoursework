import React from "react";
import LikeButton from "../LikeButton";

import "./index.css";

const DataCard = props => {
  return (
    (props.links.map((link, i)  => (
           
      <a key = {i} href = {link.href} target={link.type}>
        <div className="comment">
          <div className="comment_title">
          {link.label}
          </div>
        </div>
      </a>
    )))
  )
}

export default DataCard;