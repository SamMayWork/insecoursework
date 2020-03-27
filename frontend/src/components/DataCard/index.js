import React from "react";

import "./index.css";


/*
*
* DataCards are used for the dashboard, with one template looping (based off passed through data) to generate
* The cards we require for the users dashboard
*
*/

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
