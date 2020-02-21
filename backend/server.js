// Created 04/02/2020
//
// Main backend server file for the INSE coursework project
// This file starts an express server listening on the port 8080 for incoming connections
//
// This module is essentially a switch-board for backend of the system, accepting
// incoming connection and routing them to the correct destination
//
// Options for startup:
//  : --verbose, makes the startup procedure for the application verbose
//  : --logging, logs every HTTP request made to the server
//  : --coldstart, cold starts the system and creates all of the files in the database

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

const express = require('express');
const bodyParser = require('body-parser');
const { argv } = require('yargs');
const readline = require('readline');
const googleAuth = require('simple-google-openid');

const logging = require('./logging');
const maintain = require('./maintainmodule');
const pms = require('./postmodule');
const uac = require('./useraccountsystem');

// Still editing this, working on connecting the db
// const db = require('./model-dbstructure');

const app = express();

const listeningPort = 8080;

// Serve all of the static content for the front end
app.use(express.static('../frontend/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(GoogleAuth(process.env.OUR GOOGLE ID));
// app.use('/forum', guardMiddleware());

// ////////////////////////////////////////////////////////////// COMMAND LINE ARGUMENTS

// Set the interface for coversing with the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (argv.nodb) {
  logging.warningMessage("Starting the server without the attached DB...");
  logging.warningMessage("Only responding to requests with template");
}

if (argv.verbose) {
  logging.warningMessage('Starting the server...');
}

if (argv.coldstart) {
  maintain.coldStart();
}

// If we're running a "soft rest" (deleting all of the records but preserving the structure)
// check with the user that they meant to run this option
if (argv.softreset) {
  logging.warningMessage('SOFT RESET OPTION HAS BEEN ENABLED, ARE YOU SURE?');
  rl.question('Continue? y/n: ', (answer) => {
    if (answer === 'y') {
      logging.warningMessage("I hope you know what you're doing.");
      maintain.softReset();
    }
  });
}

// ////////////////////////////////////////////////////////////// API END POINT HANDLERS


// Handler for the HTTP GET's coming into the server, the end points that we are handling are:
// /get?thread=[param] - Gets the thread with the given ID
// /get?board=[param]&order=[param] - Gets a list of posts in a board in a given order
// Since the forum allows unregistered users to access the site, there is no need for authentication here
app.get('/get', async (req, res) => {
  handleNoDB(req, res);
  handleGetLogging(req);

  // Find a specific thread
  if (req.query.thread !== undefined) {
    await pms.retrievePost (req, res);
  }

  if (req.query.board !== undefined && req.query.order !== undefined) {
    // handleBoardGet();

    res.end();
  }

  return; 
});

// Handler for the HTTP Posts coming to create posts/comments on the server, end points for thois are
// /forum/create?board=[param] - Create a thread using the provided information in the POST body, or
//                               if the post already exists, updates the post with the edited content
// /forum/create?post=[param] - Create a comment using the provided information in the POST body, or
//                               if the comment already exists, updates the comment with the edited content
app.post('/forum/create', (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  res.end();
});

// Handler for HTTP Posts incoming to "like" or "dislike" posts
// /forum/like?like=[param]&post=[param] - If like==true then it likes the post with the given ID
// /forum/like?like=[param]&comment=[param] - If like==true then it likes the comment with the given ID
// if like==false then it will dislike the associated post
app.post('/forum/like', (req, res) => {
  handleNoDB(req, res);
  handlePostLogging(req);

  if (req.query.like !== undefined && req.query.post !== undefined) {
    // handleLike();
  }

  if (req.query.like !== undefined && req.query.comment !== undefined) {
    // handleLike();
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

// ////////////////////////////////////////////////////////////// USER ACCOUNT SYSTEM

app.get('/forum/uac', async (req, res) => {
  if (req.query.existsid !== undefined) {
    await uac.checkUserExists(req, res);
  }
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
