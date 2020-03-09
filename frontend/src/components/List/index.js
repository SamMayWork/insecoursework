/**
 * 
 * List
 * 
 * Generic list component for displaying list of other components
 */

import React from 'react';

import './index.css';

export default function List(props) {
  return (
    <div className="list">
      {props.children}
    </div>
  );
}