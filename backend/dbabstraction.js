// File Created on 07/02/2020
//
// Database abstraction layer for the repository pattern.
//
// This file provides an interface of functions for other components to use
// and converts them into SQL queries that are then run against the database

const pg = require('pg').Client;

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// GETTING-CONTENT

/**
 * Gets a post and all of its content (including comments)
 * @param {string} postid The ID of the post to get
 */
function getPost (postid) {}

/**
 * Gets a board and all of the posts on that board
 * @param {string} boardid The ID of the board to get
 * @param {string} order The order to show the posts in
 */
function getBoard (boardid, order) {}

// ////////////////////////////////////////////////////////////// CREATING-CONTENT

function createPost () {}
function createComment () {}
function createUser () {}
function editPost () {}
function editComment () {}

// ////////////////////////////////////////////////////////////// REPORTING-CONTENT

function reportPost () {}
function reportComment () {}

// ////////////////////////////////////////////////////////////// LIKING/DISLIKING COMMENTS?POSTS

/**
 * Function for liking/disliking a post
 * @param {boolean} like if true, the post is liked, if false it is disliked
 */
function ratePost (like) {}

/**
 * Function for liking/disliking a comment
 * @param {boolean} like if true, the comment is liked, if false it is disliked
 */
function rateComment (like) {}


