// / Created 04/02/2020
// /
// / Main backend server file for the INSE coursework project
// / This file starts an express server listening on the port 8080 for incoming connections
// / Options for startup:
// /  : --verbose, makes the startup procedure for the application verbose
// /  : --logging, logs every HTTP request made to the server

//////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable max-len */

const express = require('express');
const bodyParser = require('body-parser');
const { argv } = require('yargs');
const chalk = require('chalk');

const app = express();

const warnMessage = `${chalk.bgYellow.black('WARN')} `;
const getMessage = `${chalk.bgGreen.black('GET')} `;
const postMessage = `${chalk.bgRed.white('POST')} `;

// Serve all of the static content for the front end
app.use(express.static('../frontend/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ////////////////////////////////////////////////////////////// COMMAND LINE ARGUMENTS

if (argv.verbose) {
  console.log(`${warnMessage}Starting the server...`);
}

// ////////////////////////////////////////////////////////////// API END POINT HANDLERS


// Handler for the HTTP GET's coming into the server, the end points that we are handling are:
// /forum/get?thread=[param] - Gets the thread with the given ID
// /forum/get?board=[param]&order=[param] - Gets a list of posts in a board in a given order
// Since the forum allows unregistered users to access the site, there is no need for authentication here
app.get('/forum/get', (req, res) => {
  handleLogging(req, "GET");

  if (req.query.thread !== undefined) {
    // handleThreadGet();
  }

  if (req.query.board !== undefined && req.query.order !== undefined) {
    // handleBoardGet();
  }

  res.end();
});

// Handler for the HTTP Posts coming to create posts/comments on the server, end points for thois are
// /forum/create?board=[param] - Create a thread using the provided information in the POST body, or
//                               if the post already exists, updates the post with the edited content
// /forum/create?post=[param] - Create a comment using the provided information in the POST body, or
//                               if the comment already exists, updates the comment with the edited content
app.post('/forum/create', (req, res) => {
  handleLogging(req, "POST");

  res.end();
});

// Handler for HTTP Posts incoming to "like" or "dislike" posts
// /forum/like?like=[param]&post=[param] - If like==true then it likes the post with the given ID 
// /forum/like?like=[param]&comment=[param] - If like==true then it likes the comment with the given ID
// if like==false then it will dislike the associated post
app.post('/forum/like', (req, res) => {
  handleLogging(req, "POST");

  if (req.query.like !== undefined && req.query.post != undefined) {
    // handleLike();
  }

  if (req.query.like !== undefined && req.query.comment != undefined) {
    // handleLike();
  }

  res.end();
});

// Handler for HTTP posts to the report system of the application
// /forum/report?post=[param] - Reports a post using the given ID
// /forum/report?comment=[param] - Reports a comment using the given ID
app.post('forum/report', (req, res) => {
  handleLogging(req, "POST");

  if (req.query.post !== undefined) {
    // handlePostReport();
  }

  if (req.query.comment !== undefined) {
    // handleCommentReport();
  }

  res.end();
});

// //////////////////////////////////////////////////////////////

// Catch-all for 404's
app.get('*', (req, res) => {
  handleLogging(req, "GET");
  res.end('Could not process request');
});

app.listen(8080);


/**
 * Handles the logging function whenever a request comes in to the sever
 * @param {Request} req The Request for the server to handle 
 */
function handleLogging (req, type) {
  if (argv.logging) {
    console.log(`${type == "POST" ? postMessage : getMessage} ${req.originalUrl} ${Date.now()} ${req.ip}`);
  }
}