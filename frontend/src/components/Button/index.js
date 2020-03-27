import React from 'react';


/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */

export default function Button(props) {
  return (
    <button>{props.children}</button>
  )
}