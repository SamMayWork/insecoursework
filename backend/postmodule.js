// Created on 11/02/2020
//
// This is the module that is responsible for all of the actions related to
// the post management system (PMS) inside of the system architecture
//
// GETTING POSTS
// The flow for getting posts from the server is:
// Incoming Request -> thismodule -> Get Post Data    --> package data -> send to client
//                                -> Get Comment Data --^
//
// This is accomplished by having a set of request handlers and data-packers, the
// structure of the data can be changed by altering the data-packers (the handlers
// themselves should not need to be changed).


const dbabs = require('./dbabstraction');
const logging = require('./logging');

// ////////////////////////////////////////////////////////////// ESLINT DISABLES

/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// GETTING CONTENT
// #region Getting Content

/**
 * Function to get a given post and return it to the user
 * @param {request} req The Request from the user
 * @param {response} res The Response to the user
 */

async function getPost(req, res) {
  await dbabs.increasePostViews(req.query.postid);
  const { postid } = req.query;
  const postResult = await dbabs.getPost(postid);
  const commentsResult = await dbabs.getComments(postid);

  if (postResult === undefined || commentsResult === undefined) {
    res.status(404);
    res.end();
    return;
  }

  res.json(generateRetrievePostContent(postResult, commentsResult));
  res.status(200);
  res.end();
}

/**
 * Gets a comment and all of its replies
 * @param {request} req The Request from the user
 * @param {response} res The Response to the user
 */
async function getComment(req, res) {
  await dbabs.increaseCommentViews(req.query.commentid);
  const comment = await dbabs.getComment(req.query.commentid);

  if (comment === undefined) {
    req.status(404);
    req.end();
    return;
  }

  res.json(comment);
  res.status(200);
  res.end();
}

/**
 * Gets all of the content from a board
 * @param {request} req
 * @param {response} res
 */
async function getBoard(req, res) {
  const allPosts = await dbabs.getBoard(req.query.boardid);

  if (allPosts === undefined) {
    res.status(404);
    res.end();
    return;
  }

  res.json(await allPosts);
  res.status(200);
  res.end();
}

/**
 * Gets all of the Boards on the database
 * @param {request} req
 * @param {response} res
 */
async function getAll(req, res) {
  const allBoards = await dbabs.getAllBoards();

  if (allBoards === undefined) {
    res.status(404);
    res.end();
  }

  res.json(await allBoards);
  res.status(200);
  res.end();
}

// #endregion
// ////////////////////////////////////////////////////////////// POSTING CONTENT
// #region Posting Content //GREENED OUT
/**
 * Creates a new Post inside of the database
 * @param {request} req The request from the user
 * @param {response} res The response to the user
 */
async function createPost(req, res) {
  /*
  const userid = await dbabs.getUserIDFromEmail(req.user.emails[0]);

  if (userid !== undefined) {
    */
    // The user is authorised if the email is within our database
    const title = filterContent(req.body.title);
    const content = filterContent(req.body.content);

    for (let i = 0; i < req.body.keywords.length; i++) {
      req.body.keywords[i] = filterContent(req.body.keywords[i]);
    }

    console.log(title, content, req.body.keywords);
    dbabs.createPost(title, content, keywords);
    res.status(200);
    res.end();
    
  //}
}

/**
 * Creates a comment //GREENED OUT
 * @param {request} req
 * @param {response} res
 * @param {string} userid UserID for the database
 */
async function createComment(req, res, userid) {
  console.log(req.body);
  /*
  try {
    let results;
    if (req.body.reply === true) {
      results = await dbabs.createReplyComment(
        req.body.content,
        userid,
        req.body.postid,
        req.body.replyid,
      );
    } else {
      results = await dbabs.createComment(
        req.body.content,
        userid,
        req.body.postid,
      );
    }
    if (results) {
      res.status(200);
      res.end();
    }
  } catch (exception) {
    logging.warningMessage(exception);
    res.status(500);
    res.end('The server was unable to fufil this request');
  }
  */
 res.status(200).end();
}

// #endregion
// ////////////////////////////////////////////////////////////// EDITING
// #region Editing

/**
 * Edits a post
 * @param {request} req
 * @param {response} res
 */
async function editPost(req, res) {
  dbabs.editPost({
    keyword_1: req.body.keyword1,
    keyword_2: req.body.keyword2,
    keyword_3: req.body.keyword3,
    keyword_4: req.body.keyword4,
    keyword_5: req.body.keyword5,
    title: req.body.title,
    content: req.body.content,
  }, req.query.postid);
  res.status(200);
  res.end();
}

/**
 * Edits a comment
 * @param {request} req
 * @param {response} res
 */
async function editComment(req, res) {
  dbabs.editComment(req.body.content, req.query.commentid);
  res.status(200);
  res.end();
}

// #endregion
// ////////////////////////////////////////////////////////////// SEARCHiNG
// #region Searching
/**
 * Searches all of the post for a title that matches the string
 * @param {request} req
 * @param {response} res
 */
async function searchPosts(req, res) {
  const searchString = req.query.searchterm;
  if (searchString !== undefined) {
    const results = await dbabs.searchPosts(searchString);
    res.json(results);
    res.status(200);
    res.end();
  } else {
    res.status(404);
    res.end();
  }
}

/**
 * Gets all of the posts that meet contain the tag
 * @param {request} req
 * @param {response} res
 */
async function searchTags(req, res) {
  const searchString = req.query.searchtags;
  if (searchString !== undefined) {
    const results = await dbabs.searchTags(searchString);
    res.json(results);
    res.status(200);
    res.end();
  } else {
    res.status(404);
    res.end();
  }
}
// #endregion
// ////////////////////////////////////////////////////////////// FILTERS
// #region Filters
const offensivelanguage = {
  words: [
    { dirty: 'hate', clean: 'a subject of great displeasure within my personal and subjective opinion' },
    { dirty: 'stupid', clean: 'ill-prepared for rational discourse' },
  ],
};

/**
 * Filters a given string for swear/offensive words
 * @param {string} content Content to be filtered
 */
function filterContent(content) {
  const filteredContent = content;
  // Your code goes here!
  return filteredContent;
}

// #endregion
// ////////////////////////////////////////////////////////////// DATA-PACKERS
// #region Data-Packers
/**
 * Takes the result of 2 DB queries and formats them into a single JSON object
 * @param {object} post The Post to be formatted
 * @param {object} comments The Comments to be formatted
 */
function generateRetrievePostContent(post, comments) {
  const info = {
    post_information: {
      id: post.post_id,
      title: post.post_title,
      content: post.post_content,
      likes: post.post_likes,
      author: post.post_authorid,
    },

    comments_information: [

    ],
  };

  // Iterate through all of the comments and append their information as objects
  for (const row of comments.rows) {
    info.comments_information.push({
      id: row.comment_id,
      content: row.comment_content,
      likes: row.comment_likes,
      author: row.user_id,
      repliesto: row.reply_id,
    });
  }

  return info;
}
// #endregion
// ////////////////////////////////////////////////////////////// EXPORTS
// #region Exports
module.exports.getPost = getPost;
module.exports.getComment = getComment;
module.exports.getBoard = getBoard;
module.exports.getAll = getAll;

module.exports.searchPosts = searchPosts;
module.exports.searchTags = searchTags;

module.exports.createComment = createComment;
module.exports.createPost = createPost;

module.exports.editPost = editPost;
module.exports.editComment = editComment;
// #endregion
