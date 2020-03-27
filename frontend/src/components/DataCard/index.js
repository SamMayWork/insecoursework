import React from "react";

import "./index.css";

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


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
