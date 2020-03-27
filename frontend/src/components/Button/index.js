import React from 'react';

/*
*
* Basic button component
*
*/

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