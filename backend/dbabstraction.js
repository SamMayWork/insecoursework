// File Created on 07/02/2020
//
// Database abstraction layer for the repository pattern.
//
// This file provides an interface of functions for other components to use
// and converts them into SQL queries that are then run against the database

const { Pool } = require('pg');

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// QUERY EXECUTOR

let newPool;

// If we're building using Travis then use different login credentials
if (process.env.CI !== 'true') {
  newPool = new Pool ({
    host : "localhost",
    user : "test",
    password : "test",
    database : "forumbackend",
    port : 5432
  });
} else {
  newPool = new Pool ({
    host : "localhost",
    user : "postgres",
    password : null,
    database : "forumbackend",
    port : 5432
  });
}

/**
 * Executes a query on the Database using a pool
 * @param {string} query 
 * @param {list[string]} parameters 
 */
async function executeQuery (query, parameters) {
  try {
    const results = await newPool.query(query, parameters);
    return results;
  } catch (exception) {
    console.warn(exception);
  }
}

// ////////////////////////////////////////////////////////////// ID GENERATOR

/**
 * Generates a psuedo-random ID of a given length
 * @param {number} length The length of the ID to return
 */
function generateId(length) {
  if (length <= 0) {
    return undefined;
  }

  const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const generatedId = [];

  for (let i = 0; i < length; i++) {
    generatedId.unshift(values[Math.floor(Math.random() * values.length)]);
  }

  return generatedId.join('');
}

// ////////////////////////////////////////////////////////////// GETTING-CONTENT

/**
 * Gets all of the boards 
 */
async function getAllBoards () {
  const query = "SELECT * FROM Board;";
  const results = await executeQuery(query);
  return results;
}

/**
 * Gets a post and all of its content (including comments), this method hides the
 * raw database output in a JSON object with aliases for the column names to simplify use
 * @param {string} postid The ID of the post to get
 */
async function getPost(postid) {
  const query = 'SELECT * FROM posts WHERE post_id = $1';
  const results = await executeQuery(query, [postid]);
  return results.rows[0];
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

/**
 * Gets a specific board
 * @param {string} boardid 
 */
async function getBoard (boardid) {
  const query = 'SELECT * FROM board WHERE board_id = $1;';
  const results = await executeQuery(query, [boardid]);
  return results;
}

/**
 * Gets the content of a specific comment
 * @param {string} commentid ID of the comment to get 
 */
async function getComment(commentid) {
  const query = "SELECT * FROM comments WHERE comment_id = $1;";
  const results = await executeQuery(query, [commentid]);
  return results.rows[0];
}

/**
 * Gets all of the replies for a given comment, this function is recursive
 * @param {string} commentid The ID of the comment of which to get the replies for
 */
async function getReplies(commentid) {
  const query = 'SELECT * FROM comments WHERE reply_id = $1';
  let results;

  recurQuery(commentid);

  async function recurQuery (id) {
    results += await executeQuery(query, [id]);
    for (let row in results.rows[0]) {
      recurQuery(row.reply_id);
    }
  }
 
  return results;
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
 * Creates a post
 * @param {String} title Title of the post
 * @param {String} content Content of the post
 * @param {String} authorid Authot id 
 * @param {String} boardid Bord id
 */
async function createPost(title, content, authorid, boardid) {
  const query = 'INSERT INTO Posts VALUES($1, $2, $3, $4, $5, $6);';
  const results = await executeQuery(query, [generateId(8), title, content, 0, authorid, boardid]);
  return results;
}

/**
 * Create a comment on a post
 * @param {String} comment_content content of the comment 
 * @param {String} user_id user id of the author of the comment
 * @param {String} post_id post id with the comment
 */

async function createComment(comment_content, user_id, post_id) {
  const query = 'INSERT INTO Comments (comment_id, comment_content, comment_likes, user_id, post_id) VALUES($1, $2, $3, $4, $5);';
  const results = await executeQuery(query, [generateId(8), comment_content, 0, user_id, post_id]);
  return results;
}

/**
 * Create a reply to a existing comment 
 * @param {String} comment_content Create a comment
 * @param {String} user_id user id of the author of the comment
 * @param {String} post_id post id with the comment
 * @param {String} reply_id id of the comment reply
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
 * @param {String} comment_content new comment content
 * @param {String} user_id user id of the author of the existing comment
 * @param {String} post_id id of the post with the comment
 * @param {String} comment_id id of the comment
 */
async function editComment(comment_content, user_id, post_id, comment_id) {
  const query = 'UPDATE Comments SET omment_content = $1 WHERE user_id = $2 AND post_id = $3 AND comment_id = $4;';
  const results = await executeQuery(query, [comment_content, user_id, post_id, comment_id]);
  return results;
}

// ////////////////////////////////////////////////////////////// REPORTING-CONTENT

async function reportPost(user_id, post_id) {
  const query = 'INSERT INTO Reports_Posts VALUES($1, $2);';
  const result = await executeQuery (query, [user_id, post_id]);
  return result;
}

async function reportComment(user_id, comment_id) {
  const query = 'INSERT INTO Reports_Comments VALUES($1, $2);';
  const result = await executeQuery (query, [user_id, comment_id]);
  return result;
}

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
//     await executeQuery(query, [postid]);
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
//   const results = await executeQuery(query, [commentid]);
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
async function checkUserExists(userid) {
  const query = 'SELECT * FROM users WHERE user_id = $1;';
  const response = await executeQuery(query, [userid]);
  return response.rows.length !== 0;
}

async function getUserIDFromEmail (email) {
  const query = "SELECT user_id FROM users where user_email = $1;";
  const results = await executeQuery(query, email);
  return results.rows[0].user_id;
}

// ////////////////////////////////////////////////////////////// DELETING CONTENT

/**
 * Deletes all of the content from the table board
 */
async function deleteRecordBoard() {
  const query = 'DELETE FROM board;';
  await executeQuery(query);
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.getPost = getPost;
module.exports.getComments = getComments;
module.exports.getComment = getComment;
module.exports.getReplies = getReplies;
module.exports.getAllBoards = getAllBoards;
module.exports.getBoard = getBoard;

module.exports.generateId = generateId;

module.exports.createBoard = createBoard;
module.exports.createPost = createPost;
module.exports.createComment = createComment;
module.exports.createReplyComment = createComment;

module.exports.deleteRecordBoard = deleteRecordBoard;

module.exports.checkUserExists = checkUserExists;

module.exports.reportPost = reportPost;
module.exports.reportComment = reportComment;