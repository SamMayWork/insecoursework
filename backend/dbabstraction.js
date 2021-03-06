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
// #region Establishing Connection
let newPool;

// If we're building using Travis then use different login credentials
if (process.env.CI !== 'true') {
  newPool = new Pool({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'forumbackend',
    port: 5432,
  });
} else {
  newPool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: null,
    database: 'forumbackend',
    port: 5432,
  });
}

/**
 * Executes a query on the Database using a pool
 * @param {string} query
 * @param {list[string]} parameters
 */
async function executeQuery(query, parameters) {
  try {
    const results = await newPool.query(query, parameters);
    return results;
  } catch (exception) {
    console.warn(exception);
    return undefined;
  }
}

/**
 * Executes a raw query on the database, this is not safe and performs no checks
 *
 * FOR TESTING ONLY!
 * @param {string} query
 */
function executeRawQuerySync(query) {
  const result = newPool.query(query);
  return result;
}

// #endregion
// ////////////////////////////////////////////////////////////// ID GENERATOR
// #region ID Generator
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

// #endregion
// ////////////////////////////////////////////////////////////// GETTING-CONTENT
// #region Getting Content
/**
 * Gets a post and all of its content, this method hides the
 * raw database output in a JSON object with aliases for the column names to simplify use
 * @param {string} postid The ID of the post to get
 */
async function getPost(postid) {
  const query = 'SELECT * FROM posts WHERE post_id = $1;';
  const results = await executeQuery(query, [postid]);
  return results.rows[0];
}

/**
 * Returns all of the comments related to a given post, this method does not hide
 * raw database output as processing all comments to change the format would be too costly
 * @param {string} postid The ID of the posts to get the comments for
 */
async function getComments(postid) {
  const query = 'SELECT * FROM comments WHERE post_id = $1;';
  const results = await executeQuery(query, [postid]);
  return results.rows;
}

/**
 * Gets all of the posts from a specific board
 * @param {string} boardid The ID of the board to get the posts for
 */
async function getBoard(boardid) {
  const query = 'SELECT * FROM posts WHERE board_id = $1;';
  const results = await executeQuery(query, [boardid]);
  return results.rows;
}

/**
 * Gets all of the boards
 */
async function getAllBoards() {
  const query = 'SELECT * FROM Board;';
  const results = await executeQuery(query);
  return results.rows;
}

/**
 * Gets the content of a specific comment
 * @param {string} commentid ID of the comment to get
 */
async function getComment(commentid) {
  const query = 'SELECT * FROM comments WHERE comment_id = $1;';
  const results = await executeQuery(query, [commentid]);
  return results.rows[0];
}

/**
 * Gets all posts from all forums using their Date
 * @param {string} status either ASC or DESC 
 */
async function getPostsByDate (status) {
  const query = `SELECT * FROM posts ORDER BY created_date ${status.toUpperCase()}`;
  const results = await executeQuery(query, []);
  return results.rows;
}

// #endregion
// ////////////////////////////////////////////////////////////// SEARCHING
// #region Searching Content

/**
 * Returns all posts that match a title with the search string
 * @param {string} searchstring
 */
async function searchPosts(searchstring) {
  const query = 'SELECT * FROM posts WHERE post_title LIKE $1;';
  const results = await executeQuery(query, [searchstring]);
  return results.rows;
}

/**
 * Returns all of the posts that contain the tag
 * @param {*} searchtag
 */
async function searchTags(searchtag) {
  const query = 'SELECT keyword_id FROM keywords WHERE keyword_1 LIKE $1 OR keyword_2 LIKE $1 OR keyword_3 LIKE $1 OR keyword_4 LIKE $1 OR keyword_5 LIKE $1;';
  const matchingRows = await executeQuery(query, [searchtag]);
  const rows = [];
  for (const row of matchingRows.rows) {
    const postQuery = 'SELECT * FROM posts WHERE keyword_id = $1;';
    const results = await executeQuery(postQuery, [row.keyword_id]);
    for (const resultsRow of results.rows) {
      rows.push(resultsRow);
    }
  }

  return rows;
}

// #endregion
// ////////////////////////////////////////////////////////////// CREATING-CONTENT
// #region Creating Content
/**
 * Creates a board on the forum
 * @param {string} board_name Name of the board to create
 * @param {string} board_year Year of the board to create
 */
async function createBoard(board_name, board_year) {
  const query = 'INSERT INTO Board (board_id, board_module, board_year) VALUES ($1, $2, $3);';
  const id = generateId(8);
  await executeQuery(query, [id, board_name, board_year]);
  return {
    board_name,
    board_id: id,
  };
}

/**
 * Creates a list of keywords for a post to be associated with
 * @param {list[string]} keywords
 * @returns The ID of the created keyword row
 */
async function createKeywords(keywords) {
  const query = 'INSERT INTO Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4, keyword_5) VALUES ($1, $2, $3, $4, $5, $6);';
  const id = generateId(8);
  keywords.unshift(id);
  const results = await executeQuery(query, keywords);
  if (results) {
    return id;
  }
}

/**
 * Creates a post
 * @param {string} title
 * @param {string} content
 * @param {list[string]} keywords
 * @param {string} authorid
 * @param {string} boardid
 * @returns A JSON object with the ID of the created post, and the ID of the Keywords
 */
async function createPost(title, content, keywords, authorid, boardid) {
  const keywordsId = await createKeywords(keywords);
  const postQuery = 'INSERT INTO Posts (post_id, keyword_id, board_id, post_title, post_content, post_likes, user_id, created_date, reported, post_views) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10);';
  const id = generateId(8);
  await executeQuery(postQuery, [id, keywordsId, boardid, title, content, 0, authorid, new Date(), false, 0]);

  return {
    keyword_id: keywordsId,
    post_id: id,
  };
}

/**
 * Create a comment on a post
 * @param {String} comment_content content of the comment
 * @param {String} user_id user id of the author of the comment
 * @param {String} post_id post id with the comment
 */

async function createComment(comment_content, user_id, post_id) {
  const commentQuery = 'INSERT INTO Comments (comment_id, comment_content, comment_likes, user_id, post_id, reported, comment_views, correct) VALUES($1, $2, $3, $4, $5, $6, $7, $8);';
  const id = generateId(8);
  await executeQuery(commentQuery, [id, comment_content, 0, user_id, post_id, false, 0, false]);
  return {
    comment_id: id,
    comment_content,
  };
}

/**
 * Create a reply to a existing comment
 * @param {String} comment_content Create a comment
 * @param {String} user_id user id of the author of the comment
 * @param {String} post_id post id with the comment
 * @param {String} reply_id id of the comment reply
 */

async function createReplyComment(comment_content, user_id, post_id, reply_id) {
  const query = 'INSERT INTO Comments VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  const results = await executeQuery(query, [generateId(8), comment_content, 0, 0, user_id, post_id, reply_id, false, false]);
  return results;
}

// #endregion
// ////////////////////////////////////////////////////////////// EDITING-CONTENT
// #region Editing

/**
 * Edits a post using the provided content
 * @param {Object} editingcontent Object containing all of the editing content
 */
async function editPost(editingcontent, postid) {
  let query = 'SELECT * FROM posts WHERE post_id = $1;';
  const originalPost = await executeQuery(query, [postid]).rows[0];
  query = 'UPDATE keywords SET keyword_1=$1, keyword_2=$2, keyword_3=$3, keyword_4=$4, keyword5_$5 WHERE keyword_id=$6;';
  await executeQuery(query, [editingcontent.keyword_1, editingcontent.keyword_2, editingcontent.keyword_3, editingcontent.keyword_4, editingcontent.keyword_5, originalPost.keyword_id]);
  query = 'UPDATE posts SET post_title=$1, post_content=$2, edited_date=$3 WHERE post_id=$4;';
  await executeQuery(query, [editingcontent.title, editingcontent.content, new Date(), postid]);
}

/**
 * Edits the content of the comment
 * @param {string} commentContent
 * @param {string} commentid
 */
async function editComment(commentContent, commentid) {
  const query = 'UPDATE Comments SET comment_content = $1 edited_date = $2 WHERE comment_id = $3;';
  dbabs.executeQuery(query, [commentContent, new Date(), commentid]);
}

// #endregion
// ////////////////////////////////////////////////////////////// REPORTING-CONTENT
// #region Reporting

/**
 * Sets the reported field of a post to true
 * @param {string} post_id 
 */
async function reportPost(post_id) {
  const query = 'UPDATE posts SET reported = $1 WHERE post_id = $2;';
  const result = await executeQuery(query, [true, post_id]);
  return result;
}

/**
 * Reporting a comment
 * @param {String} user_id User_id that reported
 * @param {String} comment_id comment_id that is being reported
 */
async function reportComment(comment_id) {
  const query = 'UPDATE comments SET reported = $1 WHERE comment_id = $2;';
  const result = await executeQuery(query, [true, comment_id]);
  return result;
}

// #endregion
// ////////////////////////////////////////////////////////////// INCREASING-VIEWS
// #region Increasing Post Views

/**
 * Incrising the views of a post
 * @param {String} postid The post id
 */
async function increasePostViews(postid) {
  const query = 'UPDATE posts SET post_views = post_views + 1 WHERE post_id = $1';
  await executeQuery(query, [postid]);
}

/**
 * Incrising the views os a comment
 * @param {String} commentid
 */
async function increaseCommentViews(commentid) {
  const query = 'UPDATE comments SET comment_views = comment_views + 1 WHERE comment_id = $1';
  await executeQuery(query, [commentid]);
}

// #endregion
// ////////////////////////////////////////////////////////////// LIKING/DISLIKING COMMENTS?POSTS
// #region Rating Posts

/**
 * Function for liking/disliking a post
 * @param {boolean} like if true, the post is liked, if false it is disliked
 * @param {string} postId is the id of the post that is being liked/disliked
 */
async function ratePost(postid, like) {
  let value = like ? 1 : -1;
  let query = `UPDATE posts SET post_likes = post_likes + ${value} WHERE post_id = $1;`;
  await executeQuery(query, [postid]);
}

/**
 * Function for liking/disliking comments on posts
 * @param {string} commentid is the id of the comment that is being liked/disliked
 * @param {boolean} like if true, the post is like, if false it is disliked
 */
async function rateComment(commentid, like) {
  let value = like ? 1 : -1;
  let query = `UPDATE comments SET comment_likes = comment_likes + ${value} WHERE comment_id = $1;`;
  await executeQuery(query, [commentid]);
}

// #endregion
// ////////////////////////////////////////////////////////////// USER ACCOUNT QUERIES
// #region UAC Queries

/**
 * Checks to see if we have a record of an email address in the DB, returns
 * the ID of the user if a record is found
 * @param {string} email Email address to search
 */
async function checkUserExists(email) {
  const query = 'SELECT user_id FROM Users WHERE user_email = $1;';
  const results = await executeQuery(query, [email]);
  try {
    return results.rows[0].user_id !== undefined;
  } catch (exception) {
    return false;
  }
}

/**
 * Gets the UserID for a given email address
 * @param {string} email Email address to search
 */
async function getUserId(email) {
  try {
    const query = 'SELECT user_id FROM Users WHERE user_email = $1;';
    const results = await executeQuery(query, [email]);
    return results.rows[0].user_id;
  } catch (exception) {
    return undefined;
  }
}

/**
 * Switches between using the users real name and their UP number
 * @param {string} userid
 * @param {boolean} status if true, uses real name
 */
async function useRealName(userid, status) {
  const query = 'UPDATE users SET user_userealname = $1 WHERE user_id = $2;';
  executeQuery(query, [status, userid]);
}

/**
 * Creates a user and enrolls them into the DB
 * @param {object} userInformation
 */
async function enrollUser(displayname, email) {
  const query = 'INSERT INTO users VALUES ($1, $2, $3, $4, $5);';
  const id = generateId(8);
  await executeQuery(query, [id, displayname, true, email, new Date()]);
  console.log(displayname);
  return {
    user_name: displayname,
    user_email: email,
  };
}

/**
 * Gets the User ID of a given post
 * @param {string} postid
 */
async function getPostAuthor(postid) {
  const query = 'SELECT user_id FROM posts where post_id=$1;';
  const results = await executeQuery(query, [postid]);
  try {
    return results.rows[0].user_id;
  } catch (exception) {
    return undefined;
  }
}

/**
 * Gets the User ID of a given comment
 * @param {string} commentid
 */
async function getCommentAuthor(commentid) {
  const query = 'SELECT user_id FROM comments where comment_id=$1;';
  const results = await executeQuery(query, [commentid]);
  try {
    return results.rows[0].user_id;
  } catch (exception) {
    return undefined;
  }
}

/**
 * Gets the display name of a user using their ID
 * @param {string} userid the user id to get the display name for
 */
async function getDisplayNameById(userid) {
  try {
    let query = 'SELECT user_userealname FROM users WHERE user_id = $1;';
    let results = await executeQuery(query, [userid]);
    if (results.rows[0].user_userealname === true) {
      query = 'SELECT user_displayname FROM users WHERE user_id = $1;';
      results = await executeQuery(query, [userid]);
      return results.rows[0].user_displayname;
    }
    query = 'SELECT user_email FROM users WHERE user_id = $1;';
    results = await executeQuery(query, [userid]);
    return results.rows[0].user_email;
  } catch (exception) {
    return undefined;
  }
}

async function getDisplayNameByEmail(email) {
  return await getDisplayNameById(await getUserId(email));
}

/**
 * Changes the global on/off setting for notifications
 * @param {string} email 
 * @param {boolean} status 
 */
async function changeNotificationState (email, status) {
  const query = `UPDATE notifications SET notif_global = $1 WHERE user_id = $2;`;
  await executeQuery(query, [status, await getUserId(email)]);
}

// #endregion
// ////////////////////////////////////////////////////////////// DELETING CONTENT
// #region Deletion
async function deletePost(postid) {
  let query = 'DELETE FROM comments WHERE post_id = $1;';
  await executeQuery(query, [postid]);
  query = 'DELETE FROM keywords WHERE keyword_id = $1;';
  await executeQuery(query, [postid]);
  query = 'DELETE FROM posts WHERE post_id = $1;';
  await executeQuery(query, [postid]);
}

async function deleteComment(commentid) {
  const query = 'UPDATE comments SET comment_content = $1 AND user_id = $2 WHERE comment_id = $3;';
  await executeQuery(query, ['This comment has been removed by its author', '00000000', 'commentid']);
}
// #endregion
// ////////////////////////////////////////////////////////////// EXPORTS
// #region Exports
module.exports.getPost = getPost;
module.exports.getComments = getComments;
module.exports.getComment = getComment;
module.exports.getAllBoards = getAllBoards;
module.exports.getBoard = getBoard;
module.exports.getPostsByDate = getPostsByDate;

module.exports.changeNotificationState = changeNotificationState;

module.exports.deletePost = deletePost;
module.exports.deleteComment = deleteComment;

module.exports.searchPosts = searchPosts;
module.exports.searchTags = searchTags;

module.exports.generateId = generateId;

module.exports.createBoard = createBoard;
module.exports.createPost = createPost;
module.exports.createComment = createComment;
module.exports.createReplyComment = createReplyComment;

module.exports.editPost = editPost;
module.exports.editComment = editComment;

module.exports.enrollUser = enrollUser;
module.exports.checkUserExists = checkUserExists;
module.exports.getPostAuthor = getPostAuthor;
module.exports.getCommentAuthor = getCommentAuthor;
module.exports.useRealName = useRealName;
module.exports.getDisplayNameById = getDisplayNameById;
module.exports.getUserId = getUserId;
module.exports.getDisplayNameByEmail = getDisplayNameByEmail;

module.exports.reportPost = reportPost;
module.exports.reportComment = reportComment;

module.exports.increasePostViews = increasePostViews;
module.exports.increaseCommentViews = increaseCommentViews;

module.exports.ratePost = ratePost;
module.exports.rateComment = rateComment;

module.exports.executeRawQuerySync = executeRawQuerySync;
// #endregion
