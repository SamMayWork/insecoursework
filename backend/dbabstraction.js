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
  sqlConnection = new Postgres({
    database: 'forumbackend',
    statement_timeout: 2000,
    host: '/var/run/postgresql',
  });

  logging.warningMessage('Connecting to the Database');
  sql.connect();

  sql.on('error', (err) => {
    console.log(err);
    sql.end();
  });
} catch (error) {
  logging.errorMessage(error);
  logging.errorMessage('Unable to connect to the DB');
}

// ////////////////////////////////////////////////////////////// GETTING-CONTENT

/**
 * Gets a post and all of its content (including comments)
 * @param {string} postid The ID of the post to get
 */
function getPost (postid) {}

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
  await sqlConnection.query(query, generateID(8), board_name, board_year);
  return true;
}

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
 * @param {string} postId is the id of the post that is being liked/disliked 
 */

try {async function ratePost (postid, like) {
  let query;
  const results = await sql.query(query, [postid]);
  if(like == true){
    query = `update Posts set post_likes = post_likes + 1 where post_id = ${postid};`
  }
  else{
    query = `update Posts set post_likes = post_likes - 1 where post_id = ${postid};`
  };
  return true;
}
} catch(error) {
logging.errorMessage(error);
  return false;
}

/**
 * Function for liking/disliking comments on posts
 * @param {string} commentid is the id of the comment that is being liked/disliked
 * @param {boolean} like if true, the post is like, if false it is disliked
 */

try {async function rateComment (commentid, like) {
  let query;
  const results = await sql.query(query, [commentid]);
  if(like == true){
    query = `update Comments set comment_likes = comment_likes + 1 where comment_id = ${commentid};`
  }
  else{
    query = `update Comments set comment_likes = comment_likes - 1 where comment_id = ${commentid}`
  };
  return true;
}
} catch(error) {
  logging.errorMessage(error);
  return false;
}

