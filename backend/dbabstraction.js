// File Created on 07/02/2020
//
// Database abstraction layer for the repository pattern.
//
// This file provides an interface of functions for other components to use
// and converts them into SQL queries that are then run against the database

const pg = require('pg').Client;
const logging = require('./logging');

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// ESTABLISHING-CONNECTION

let sqlConnection;

try {
  sqlConnection = new pg({
    database: 'forumbackend',
    statement_timeout: 2000,
    host: '/var/run/postgresql',
  });

  logging.warningMessage('Connecting to the Database');
  sqlConnection.connect();

  sqlConnection.on('error', (err) => {
    console.log(err);
    sqlConnection.end();
  });

  logging.successMessage ('Connection to DB provider established');
} catch (error) {
  logging.errorMessage(error);
  logging.errorMessage('Unable to connect to the DB');
}

// ////////////////////////////////////////////////////////////// ID GENERATOR

/**
 * Generates a psuedo-random ID of a given length
 * @param {number} length The length of the ID to return
 */
function generateId(length) {
  const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const generatedId = [];

  for (let i = 0; i < length; i++) {
    generatedId.unshift(values[Math.floor(Math.random() * values.length)]);
  }

  return generatedId.join('');
}

// ////////////////////////////////////////////////////////////// GETTING-CONTENT

/**
 * Gets a post and all of its content (including comments)
 * @param {string} postid The ID of the post to get
 */
async function getPost(postid) {
  const query = "SELECT * FROM posts WHERE post_id = $1";
  const results = await sqlConnection.query(query, [postid]);
  return {
    id : results.rows[0].post_id,
    title : results.rows[0].post_title,
    content : results.rows[0].post_content,
    likes : results.rows[0].post_likes,
    authorid : results.rows[0].user_id
  };
}

/**
 * Returns all of the comments related to a given post
 * @param {string} postid The ID of the posts to get the comments for 
 */
async function getComments (postid) {
  const query = "SELECT * FROM comments WHERE post_id = $1";
  const results = await sqlConnection.query(query, [postid]);
  return results;
}

function getBoard(board_name, board_year) {

}

// ////////////////////////////////////////////////////////////// CREATING-CONTENT


/**
 * Creates a board on the forum
 * @param {string} board_name Name of the board to create
 * @param {string} board_year Year of the board to create
 */
async function createBoard(board_name, board_year) {
  const query = 'INSERT INTO Board (board_id, board_module, board_year) VALUES ($1, $2, $3);';
  await sqlConnection.query(query, [generateId(8), board_name, board_year]);
}

function createPost() {}
function createComment() {}
function createUser() {}
function editPost() {}
function editComment() {}

// ////////////////////////////////////////////////////////////// REPORTING-CONTENT

function reportPost() {}
function reportComment() {}

// ////////////////////////////////////////////////////////////// LIKING/DISLIKING COMMENTS?POSTS

/**
 * Function for liking/disliking a post
 * @param {boolean} like if true, the post is liked, if false it is disliked
 * @param {string} postId is the id of the post that is being liked/disliked
 */

async function ratePost(postid, like) {
  try {
    let query;
    const results = await sqlConnection.query(query, [postid]);
    if (like === true) {
      query = `update Posts set post_likes = post_likes + 1 where post_id = ${postid};`;
    } else {
      query = `update Posts set post_likes = post_likes - 1 where post_id = ${postid};`;
    }
    return true;
  } catch (error) {
    logging.errorMessage(error);
    return false;
  }
}

/**
 * Function for liking/disliking comments on posts
 * @param {string} commentid is the id of the comment that is being liked/disliked
 * @param {boolean} like if true, the post is like, if false it is disliked
 */

async function rateComment(commentid, like) {
  try {
    let query;
    const results = await sqlConnection.query(query, [commentid]);
    if (like === true) {
      query = `update Comments set comment_likes = comment_likes + 1 where comment_id = ${commentid};`;
    } else {
      query = `update Comments set comment_likes = comment_likes - 1 where comment_id = ${commentid}`;
    }
    return true;
  } catch (error) {
    logging.errorMessage(error);
    return false;
  }
}

// ////////////////////////////////////////////////////////////// DELETING CONTENT

/**
 * Deletes all of the content from the table board
 */
async function deleteRecordBoard () {
  const query = "DELETE FROM board;";
  await sqlConnection.query(query);
}

// ////////////////////////////////////////////////////////////// RAW ACCESS

/**
 * Runs a general query against the databse and returns the result to the caller
 * 
 * This method is unsafe and does not check for SQL Injection, so only use if you
 * know what you're doing...
 * @param {string} query Query to be executed on the database
 * @param {callback} callback Callback to be executed once the command has been run 
 */
function generalQuery (query, callback) {
  sqlConnection.query(query);
}

module.exports.deleteRecordBoard = deleteRecordBoard;
module.exports.createBoard = createBoard;
module.exports.getPost = getPost;
module.exports.getComments = getComments;