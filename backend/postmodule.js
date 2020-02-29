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

/**
 * Function to get a given post and return it to the user
 * @param {request} req The Request from the user
 * @param {response} res The Response to the user
 */

async function getPost(req, res) {
  const threadid = req.query.thread;
  const postResult = await dbabs.getPost(threadid);
  const commentsResult = await dbabs.getComments(threadid);
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
  const comment = await dbabs.getComment();
  const replies = await dbabs.getReplies();

  if (comment === undefined) { 
    req.status(404);
    req.end();
  }

  const packagedContent = generateCommentReplies(comment, replies);
  res.json(packagedContent);
  res.status(200);
  res.end();
}

// ////////////////////////////////////////////////////////////// POSTING CONTENT

/**
 * Creates a new Post inside of the database
 * @param {request} req The request from the user
 * @param {response} res The response to the user
 */
async function createPost(req, res) {
  const userid = await dbabs.getUserIDFromEmail(req.user.emails[0]);
  
  if (userid !== undefined) {
    // The user is authorised if the email is within our database
    const title = filterContent(req.body.title);
    const content = filterContent(req.body.title);
    
    for (let i = 0; i < req.body.keywords.length; i++) {
      req.body.keywords[i] = filterContent(req.body.keywords[i]); 
    }

    dbabs.createPost(title, content, keywords);
    res.status(200);
    res.end();
  }
}

/**
 * Creates a comment
 * @param {request} req 
 * @param {response} res 
 * @param {string} userid UserID for the database 
 */
async function createComment (req, res, userid) {
  try {
    let results;
    if (req.body.reply === true) {
      results = await dbabs.createReplyComment(
        req.body.content,
        userid,
        req.body.postid,
        req.body.replyid
      );
    } else {
      results = await dbabs.createComment(
        req.body.content,
        userid,
        req.body.postid
      );
    }
    if (results) {
      res.status(200);
      res.end();
    }
  } catch (exception) {
    logging.warningMessage(exception);
    res.status(500);
    res.end("The server was unable to fufil this request");
  }
}

// ////////////////////////////////////////////////////////////// FILTERS

const offensivelanguage = {
  words : [
    { dirty : "hate", clean : "a subject of great displeasure within my personal and subjective opinion" },
    { dirty : "stupid", clean : "ill-prepared for rational discourse"}
  ]
}

/**
 * Filters a given string for swear/offensive words
 * @param {string} content Content to be filtered 
 */
function filterContent (content) {
  let filteredContent = content;
  // Your code goes here!
  return filteredContent;
}


// ////////////////////////////////////////////////////////////// DATA-PACKERS

/**
 * Takes the result of 2 DB queries and formats them into a single JSON object
 * @param {object} post The Post to be formatted
 * @param {object} comments The Comments to be formatted
 */
function generateRetrievePostContent(post, comments) {
  const info = {
    post_information: {
      id: post.id,
      title: post.title,
      content: post.content,
      likes: post.likes,
      author: post.authorid,
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

/**
 * Packages a comment and its replies into a single JSON object
 * @param {JSON} comment The searched comment
 * @param {JSON} replies A Collection of its replies 
 */
function generateCommentReplies (comment, replies) {
  if (replies !== undefined) {
    return comment + replies;
  }
  return comment;
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.getPost = getPost;
module.exports.getComment = getComment;

module.exports.createComment = createComment;