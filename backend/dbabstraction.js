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

/**
 * Initialises the DB connection when the module has been started
 */
function initialiseDB(connection) {
  try {
    connection = new pg({
      database: 'forumbackend',
      statement_timeout: 2000,
      host: '/var/run/postgresql',
    });
  
    logging.warningMessage('Connecting to the Database');
    connection.connect();
  
    connection.on('error', (err) => {
      console.log(err);
      connection.end();
      connection = undefined;
    });
    logging.successMessage('Connection to DB provider established');
  } catch (error) {
    logging.errorMessage(error);
    logging.errorMessage('Unable to connect to the DB');
    connection = undefined;
  }  
}

initialiseDB(sqlConnection);

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

// ////////////////////////////////////////////////////////////// QUERY EXECUTOR

/**
 * Executes a query on the database, providing the raw feedback to the caller
 * @param {string} queryString The String to be executed on the database
 * @param {array} queryParameters An array of strings of values to be inserted into the query
 */
async function executeQuery (queryString, queryParameters) {
  try {
    let results;
    if (queryParameters === undefined) {
      results = await sqlConnection.query(queryString);
    } else {
      results = await sqlConnection.query(queryString, queryParameters);
    }
    return results;
  } catch (exception) {
    // Print the string that caused the error, the parameters and the stacktrace 
    logging.warningMessage(`Error trying to query the database using the query ${queryString}, using the following parameters`);
    for (let i = 0; i < queryParameters.length; i++) {
      logging.warningMessage(`${i} - ${queryParameters[i]}`);
    }
    logging.warningMessage("Printing stack trace...");
    logging.warningMessage(exception);
  }
}

// ////////////////////////////////////////////////////////////// GETTING-CONTENT

/**
 * Gets a post and all of its content (including comments), this method hides the
 * raw database output in a JSON object with aliases for the column names to simplify use
 * @param {string} postid The ID of the post to get
 */
async function getPost(postid) {
  const query = 'SELECT * FROM posts WHERE post_id = $1';
  const results = await executeQuery(query, [postid]);
  return {
    id: results.rows[0].post_id,
    title: results.rows[0].post_title,
    content: results.rows[0].post_content,
    likes: results.rows[0].post_likes,
    authorid: results.rows[0].user_id,
  };
}

/**
 * Returns all of the comments related to a given post, this method does not hide
 * raw database output as processing all comments to change the format would be too costly
 * @param {string} postid The ID of the posts to get the comments for
 */
async function getComments(postid) {
  const query = 'SELECT * FROM comments WHERE post_id = $1';
  const results = await executeQuery(query, [postid]);
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
  const results = await executeQuery(query, [generateId(8), board_name, board_year]);
  return results;
}
/**
 * 
 * @param {*} title 
 * @param {*} content 
 * @param {*} authorid 
 * @param {*} boardid 
 */

async function createPost(title, content, authorid, boardid) {
  const query = 'INSERT INTO Posts VALUES($1, $2, $3, $4, $5, $6);';
  const results = await executeQuery(query, [generateId(8), title, content, 0, authorid, boardid]);
  return results;
}


/**
 * 
 * @param {*} comment_content 
 * @param {*} user_id 
 * @param {*} post_id 
 */

async function createComment(comment_content, user_id, post_id) {
  const query = 'INSERT INTO Comments (comment_id, comment_content, comment_likes, user_id, post_id) VALUES($1, $2, $3, $4, $5);';
  const results = await executeQuery(query, [generateId(8), comment_content, 0, user_id, post_id]);
  return results;
}

/**
 * 
 * @param {*} comment_content 
 * @param {*} user_id 
 * @param {*} post_id 
 * @param {*} reply_id 
 */

async function createReplyComment(comment_content, user_id, post_id, reply_id) {
  const query = 'INSERT INTO Comments VALUES($1, $2, $3, $4, $5, $6);';
  const results = await executeQuery(query, [generateId(8), comment_content, 0, user_id, post_id, reply_id]);
  return results;
}
/**
 * adds user to the database
 * @param {string} user_email the users email
 * @param {Date} user_dateofregistration the date of registration
 */
async function createUser(user_email, user_dateofregistration) {
  const query = 'INSERT INTO User VALUES($1, $2, $3);';
  const results = await executeQuery(query, [generateId(8), user_email, user_dateofregistration]);
  return results;
}


/**
 * Edits the given post 
 * @param {string} newTitle the new title 
 * @param {string} newContent the new content
 * @param {string} user_id the use ID of the user that is editing the post
 * @param {string} post_id the post ID
 */

async function editPost(newTitle, newContent, user_id, post_id) {
  const query = 'UPDATE Posts SET post_title = $1, post_content = $2 WHERE user_id = $3 AND post_id = $4;';
  const results = await executeQuery(query, [newTitle, newContent, user_id, post_id]);
  return results;
}

/**
 * Editing the given comment 
 * @param {String} comment_content 
 * @param {String} user_id 
 * @param {String} post_id 
 * @param {String} comment_id
 */
async function editComment(comment_content, user_id, post_id, comment_id) {
  const query = 'UPDATE Comments SET omment_content = $1 WHERE user_id = $2 AND post_id = $3 AND comment_id = $4;';
  const results = await executeQuery(query, [comment_content, user_id, post_id, comment_id]);
  return results;
}

// ////////////////////////////////////////////////////////////// REPORTING-CONTENT

function reportPost() {}
function reportComment() {}

// ////////////////////////////////////////////////////////////// LIKING/DISLIKING COMMENTS?POSTS

/**
 * Function for liking/disliking a post
 * @param {boolean} like if true, the post is liked, if false it is disliked
 * @param {string} postId is the id of the post that is being liked/disliked
//  */
// async function ratePost(postid, like) {
//   try {
//     let query;
//     if (like === true) {
//       query = `update Posts set post_likes = post_likes + 1 where post_id = $1;`;
//     } else {
//       query = `update Posts set post_likes = post_likes - 1 where post_id = $1;`;
//     }
//     await sqlConnection.query(query, [postid]);
//   }
//   catch (error) {
//     logging.errorMessage(error);
//   }
// }

/**
 * Function for liking/disliking comments on posts
 * @param {string} commentid is the id of the comment that is being liked/disliked
 * @param {boolean} like if true, the post is like, if false it is disliked
 */

// async function rateComment(commentid, like) {
//   try {
//     let query;
//     if (like === true) {
//       query = `update Comments set comment_likes = comment_likes + 1 where comment_id = ${commentid};`;
//     } else {
//       query = `update Comments set comment_likes = comment_likes - 1 where comment_id = ${commentid}`;
//     }
//     return true;
//   }
//   const results = await sqlConnection.query(query, [commentid]);
//   catch (error) {
//     logging.errorMessage(error);
//     return false;
//   }
// }

// ////////////////////////////////////////////////////////////// USER ACCOUNT QUERIES

/**
 * Checks to see if a user exists inside of the database
 * @param {string} userid The ID of the user to check
 */
async function checkEmail() {
  const query = 'SELECT * FROM users WHERE user_email = $1;';
  const response = await executeQuery(query, [userid]);
  return response.rows.length !== 0;
}


// ////////////////////////////////////////////////////////////// DELETING CONTENT

/**
 * Deletes all of the content from all of the tables, preserving the structure of the tables
 */
async function deleteAllStoredContent () {
  await executeQuery("DELETE FROM Users;");
  await executeQuery("DELETE FROM Board;");
  await executeQuery("DELETE FROM Posts;");
  await executeQuery("DELETE FROM Comments;");
  await executeQuery("DELETE FROM Reports_Posts;");
  await executeQuery("DELETE FROM Reports_Comments;");
  await executeQuery("DELETE FROM Keywords;");
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
function generalQuery(query, callback) {
  sqlConnection.query(query);
}

module.exports.deleteRecordBoard = deleteRecordBoard;
module.exports.createBoard = createBoard;
module.exports.getPost = getPost;
module.exports.getComments = getComments;
module.exports.checkUserExists = checkUserExists;
module.exports.createPost = createPost;
module.exports.createComment = createComment;
module.exports.createReplyComment = createComment;
