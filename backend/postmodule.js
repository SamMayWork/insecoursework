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

// ////////////////////////////////////////////////////////////// ESLINT DISABLES

/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// GETTING CONTENT

/**
 * Function to get a given post and return it to the user
 * @param {request} req The Request from the user
 * @param {response} res The Response to the user
 */

async function retrievePost(req, res) {
  const threadid = req.query.thread;
  const postResult = await dbabs.getPost(threadid);
  const commentsResult = await dbabs.getComments(threadid);
  res.json(generateRetrievePostContent(postResult, commentsResult));
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
  }
}

// ////////////////////////////////////////////////////////////// FILTERS

const offensivelanguage = {
  words = [
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

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.retrievePost = retrievePost;
