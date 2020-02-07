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
 */
function ratePost (like) {}

/**
 * Function for liking/disliking a comment
 * @param {boolean} like if true, the comment is liked, if false it is disliked
 */
function rateComment (like) {}


