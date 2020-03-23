// Created 04/02/2020
//
// Main backend server file for the INSE coursework project
// This file starts an express server listening on the port 8080 for incoming connections
//
// This module is essentially a switch-board for backend of the system, accepting
// incoming connection and routing them to the correct destination
//
// Options for startup:
//  : --logging, logs every HTTP request made to the server, listing the resource and the IP
//  : --coldstart, cold starts the system and creates all of the tables in the DB, requires restart
//  : --nodb, starts the server with no attached Database, responding to queries with a template JSON

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// REQUIRES
// #region Requires
const express = require('express');
const bodyParser = require('body-parser');
const { argv } = require('yargs');
const GoogleAuth = require('simple-google-openid');

const logging = require('./logging');
const maintain = require('./maintainmodule');
const pms = require('./postmodule');
const uac = require('./useraccountsystem');
const reporting = require('./reportingsystem');
// #endregion
// ////////////////////////////////////////////////////////////// CONSTANTS
// #region Constants
const app = express();
const listeningPort = 8080;

app.use(express.static('frontend/build/'));

// Sets parameters for recieving information
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(GoogleAuth('817279853236-toe6rfq5ebg7rife6fvd82hh0eclpt3t.apps.googleusercontent.com'));
app.use('/forum', GoogleAuth.guardMiddleware());
// #endregion
// ////////////////////////////////////////////////////////////// COMMAND LINE ARGUMENTS
// #region Command line arguments
if (argv.nodb) {
  logging.warningMessage('Starting the server without the attached DB...');
  logging.warningMessage('Only responding to requests with template');
}

if (argv.coldstart) {
  logging.coldStartMessage('Starting the cold-start procedure');
  maintain.coldStart();
  logging.coldStartMessage('Cold-Start procedure has been finished, continuing to start the server!');
}

// #endregion
// ////////////////////////////////////////////////////////////// GETTING
// #region Getting
// Handler for HTTP GET's for content from the server, endpoints are
// /get?postid=[param] - Gets a specific post off of the server, along with all of the comments
// /get?boardid=[param] - Gets a collection of posts from a specific board
// /get?commentid=[param] - Gets a comment and all of its children
// This is excluded from the guard middleware so there is no need for auth checking
app.get('/get', async (req, res) => {
  handleNoDB(req, res);
  handleGetLogging(req);

  if (req.query.postid) {
    await pms.getPost(req, res);
  }

  if (req.query.boardid) {
    await pms.getBoard(req, res);
  }

  if (req.query.commentid) {
    await pms.getComment(req, res);
  }

  if (req.query.all) {
    await pms.getAll(req, res);
  }
});

/**
 * Handler for / so if someone just types in our IP they will get index.html
 */
app.get('/', (req, res) => {
  res.sendFile('frontend/build/index.html', { root: __dirname });
  res.status(200);
  res.end();
});

// #endregion
// ////////////////////////////////////////////////////////////// SEARCHING
// #region Searching
// Handler for searching for content, endpoints are
// /get/search?type=post&searchterm=[param] - Search term is a string title
// /get/search?type=post&searchtags=[param] - Search term is a tag
app.get('/get/search', async (req, res) => {
  handleGetLogging(req);
  if (req.query.type === 'post' && req.query.searchterm !== undefined) {
    await pms.searchPosts(req, res);
    return;
  }

  if (req.query.type === 'post' && req.query.searchtags !== undefined) {
    await pms.searchTags(req, res);
    return;
  }

  res.status(404);
  res.end();
});
// #endregion
// ////////////////////////////////////////////////////////////// CREATING CONTENT
// #region Creating content
// Handler for the HTTP Posts coming to create posts/comments on the server, end points for this are
// /forum/create?type=post - Create a post
// /forum/create?type=comment - Create a comment
app.post('/forum/create', async (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  if (!uac.checkUserExists(req)) {
    forbidden(res);
  }

  if (req.query.type === 'post') {
    await pms.createPost(req, res);
  }

  if (req.query.type === 'comment') {
    await pms.createComment(req, res);
  }
});
// #endregion
// ////////////////////////////////////////////////////////////// EDITING CONTENT
// #region Editing
// Handler for edit requests, endpoints are:
// /forum/edit?type=post&postid=[param] - Edit a given post
// /forum/edit?type=comment&commentid=[param] - Edit a given comment
app.post('/forum/edit', async (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  // Check Supplied Details -> Authentication -> Authorisation -> Access

  if (req.query.type === 'post' && req.query.postid !== undefined) {
    if (await uac.getUsersID(req) === await uac.getPostAuthor(req.query.postid)) {
      await pms.editPost(req, res);
      return;
    }
  }

  if (req.query.type === 'comment' && req.query.commentid !== undefined) {
    if (await uac.getUsersID(req) === await uac.getCommentAuthor(req.query.commentid)) {
      await pms.editComment(req, res);
      return;
    }
  }

  res.status(404);
  res.end();
});
// #endregion
// ////////////////////////////////////////////////////////////// RATING CONTENT
// #region Rating Content
// Handler for HTTP Posts incoming to "like" or "dislike" posts
// /forum/like?like=[param]&post=[param] - If like==true then it likes the post with the given ID
// /forum/like?like=[param]&comment=[param] - If like==true then it likes the comment with the given ID
// if like==false then it will dislike the associated post
app.post('/forum/like', async (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  if (!uac.checkUserExists(req)) {
    forbidden(res);
  }

  if (req.query.postid === undefined || req.query.status === undefined) {
    res.status(404);
    res.end('Invalid parameters');
  }

  // Handle for liking/disliking a post
  if (req.query.postid !== undefined
    && req.query.status !== undefined
    && req.query.type === 'post') {
    await pms.likePost(req, res);
  }

  if (req.query.postid !== undefined
    && req.query.status !== undefined
    && req.query.type === 'comment') {
    await pms.dislikePost(req, res);
  }
});
// #endregion
// ////////////////////////////////////////////////////////////// REPORTING CONTENT
// #region Reporting
// Handler for HTTP posts to the report system of the application
// /forum/report?post=[param] - Reports a post using the given ID
// /forum/report?comment=[param] - Reports a comment using the given ID
app.post('forum/report', (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  if (!uac.checkUserExists(req)) {
    forbidden(res);
    return;
  }

  if (req.query.post !== undefined) {
    reporting.reportPost(req, res);
  }

  if (req.query.comment !== undefined) {
    reporting.reportComment(req, res);
  }

  res.end();
});
// #endregion
// ////////////////////////////////////////////////////////////// UAC ENDPOINTS
// #region UAC Endpoints

app.post('/forum/uac', (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  // Save the user into the DB
  if (req.query.register === 1) {
    enrollUser(req, res);
    await ns.generateRegistrationConfirmation (req);
  }
});


// #endregion
// ////////////////////////////////////////////////////////////// CATCH-ALLS
// #region 404 Handlers
// Catch-all for 404's
app.get('*', (req, res) => {
  handleGetLogging(req, '404');
  res.end('Could not process request');
});

app.post('*', (req, res) => {
  handlePostLogging(req, '404');
  res.end('Could not process request');
});
// #endregion
// ////////////////////////////////////////////////////////////// ODDS AND ENDS
// #region Odds and ends
function forbidden(res) {
  res.status(403);
  res.end('No valid sign-in');
}

/**
 * Handles logging for the servers HTTP Post's
 * @param {request} req The incoming request
 * @param {string} message Optional message to append (404's)
 */
function handlePostLogging(req, message = '') {
  if (argv.logging) {
    logging.logHttpPostMessage(req, message);
  }
}

/**
 * Handles logging for the server for HTTP Get's
 * @param {request} req The incoming request
 * @param {string} message Optional message to append (404's)
 */
function handleGetLogging(req, message = '') {
  if (argv.logging) {
    logging.logHttpGetMessage(req, message);
  }
}

/**
 * Handles Requests to the server when there is no DB attached
 * @param {request} req Request from the client
 * @param {response} res Repsonse to the client
 */
function handleNoDB(req, res) {
  if (argv.nodb) {
    res.status(200);
    res.end(`Acknowledge ${req.ip}, server is running without attached DB`);
  }
}
// #endregion
// ////////////////////////////////////////////////////////////// DRIVING SCRIPT

logging.warningMessage(`Server initialised and listening on port ${listeningPort}`);
app.listen(listeningPort);
