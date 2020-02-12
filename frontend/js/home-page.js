// Created 12/02/2020

// This file contains all of the controlling logic behind the home-page

window.addEventListener('load', start);

// ////////////////////////////////////////////////////////////// START SCRIPT

/**
 * Start script for the home-page
 */
function start () {
  window.searchedcontent.addEventListener('keydown', handleSearch);
}

// ////////////////////////////////////////////////////////////// EVENT LISTENERS

/**
 * Event handler for the keydown event on the front end
 * @param {KeyboardEvent} e 
 */
function handleSearch (e) {
  // When something has been entered in the input-box try and resolve it to a module
  // on the backend and provide the link to the user using the hidden-search-results box

  
}


