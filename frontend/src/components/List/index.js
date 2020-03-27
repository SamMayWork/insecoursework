/**
 * 
 * List
 * 
 * Generic list component for displaying list of other components
 */

import React from 'react';

import './index.css';

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


export default function List(props) {
  return (
    <div className="list">
      {props.children}
    </div>
  );
}