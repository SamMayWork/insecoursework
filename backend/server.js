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
//  : --softreset, removes all records from the Database, requires restart

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// REQUIRES

const express = require('express');
const bodyParser = require('body-parser');
const { argv } = require('yargs');
const googleAuth = require('simple-google-openid');

const logging = require('./logging');
const maintain = require('./maintainmodule');
const pms = require('./postmodule');
const uac = require('./useraccountsystem');

// ////////////////////////////////////////////////////////////// CONSTANTS

const app = express();
const listeningPort = 8080;

app.use(express.static('../frontend/'));

// Sets parameters for recieving information
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(GoogleAuth(process.env.OUR GOOGLE ID));
// app.use('/forum', guardMiddleware());

// ////////////////////////////////////////////////////////////// COMMAND LINE ARGUMENTS

if (argv.nodb) {
  logging.warningMessage("Starting the server without the attached DB...");
  logging.warningMessage("Only responding to requests with template");
}

if (argv.coldstart) {
  logging.coldStartMessage("Starting the cold-start procedure");
  maintain.coldStart();
  logging.coldStartMessage("Cold-Start procedure has been finished, continuing to start the server!");
}

if (argv.softreset) {
  logging.warningMessage("Soft Reset mode has been enabled, clearing the server now.");
  maintain.softreset();
  logging.warningMessage("Content of the Database has been cleared and the structure has been preserved");
  logging.warningMessage("Restart the server without the --softreset, but with the --coldstart operation to begin normal operation");
  return;
}

// ////////////////////////////////////////////////////////////// API END POINT HANDLERS

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
    await pms.getComment(res, res);
  }
});

// Handler for the HTTP Posts coming to create posts/comments on the server, end points for this are
// /forum/create?type=post - Create a post
// /forum/create?type=comment - Create a comment
app.post('/forum/create', (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  // Check the type of the request -> Check for authorisation -> Authorised -> Generate the content
  //                                                          -> Unauthorised -> forbidden

  if (req.query.type === "post") {
    pms.createPost(req, res);
  }

  if (req.query.type === "comment") {
    if (uac.checkUserExists(req)) {
      pms.createComment(req, res);
    } else {
      forbidden();
    }
  }
});

// Handler for HTTP Posts incoming to "like" or "dislike" posts
// /forum/like?like=[param]&post=[param] - If like==true then it likes the post with the given ID
// /forum/like?like=[param]&comment=[param] - If like==true then it likes the comment with the given ID
// if like==false then it will dislike the associated post
app.post('/forum/like', async (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  if (req.query.postid === undefined || req.query.status === undefined) {
    res.status(404);
    res.end("Invalid parameters");
  }

  // Handle for liking/disliking a post
  if (req.query.postid !== undefined &&
    req.query.status !== undefined && 
    req.query.type === 'post') {
      if(uac.checkUserExists(req)) {
        await pms.likePost(req, res);
      }
  }

  if (req.query.postid !== undefined &&
    req.query.status !== undefined && 
    req.query.type === 'comment') {
      if (uac.checkUserExists(req)) {
        await pms.dislikePost(req, res);
      }
  }


  res.end();
});

// Handler for HTTP posts to the report system of the application
// /forum/report?post=[param] - Reports a post using the given ID
// /forum/report?comment=[param] - Reports a comment using the given ID
app.post('forum/report', (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  if (req.query.post !== undefined) {
    // handlePostReport();
  }

  if (req.query.comment !== undefined) {
    // handleCommentReport();
  }

  res.end();
});

// ////////////////////////////////////////////////////////////// CATCH-ALLS

// Catch-all for 404's
app.get('*', (req, res) => {
  handleGetLogging(req, '404');
  res.end('Could not process request');
});

app.post('*', (req, res) => {
  handlePostLogging(req, '404');
  res.end('Could not process request');
});

// ////////////////////////////////////////////////////////////// ODDS AND ENDS

/**
 * Checks to see if the signed-in user is logged inside of the database, this does
 * not mean that they are allowed to make any change they want!
 * @param {request} req Request from client
 * @param {response} res Response to the user
 */
async function handleAuth (req, res) {
  const results = await uac.checkAuth(req);
  if (results === false) {
    res.status(403);
    res.end();
    return false;
  } else {
    return true;
  }
}

function forbidden (res) {
  res.status(403);
  res.end("No valid sign-in");
}

/**
 * Handles logging for the servers HTTP Post's
 * @param {request} req The incoming request
 * @param {string} message Optional message to append (404's)
 */
function handlePostLogging (req, message='') {
  if (argv.logging) {
    logging.logHttpPostMessage(req, message);
  }
}

/**
 * Handles logging for the server for HTTP Get's
 * @param {request} req The incoming request
 * @param {string} message Optional message to append (404's)
 */
function handleGetLogging (req, message='') {
  if (argv.logging) {
    logging.logHttpGetMessage(req, message);
  }
}

/**
 * Handles Requests to the server when there is no DB attached
 * @param {request} req Request from the client
 * @param {response} res Repsonse to the client
 */
function handleNoDB (req, res) {
  if (argv.nodb) {
    res.status(200);
    res.end(`Acknowledge ${req.ip}, server is running without attached DB`);  
  }
}

// ////////////////////////////////////////////////////////////// DRIVING SCRIPT

logging.warningMessage(`Server initialised and listening on port ${listeningPort}`);
app.listen(listeningPort);
