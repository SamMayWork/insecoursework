// / Created 04/02/2020
// /
// / Main backend server file for the INSE coursework project
// / This file starts an express server listening on the port 8080 for incoming connections
// /
// /

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
  console.log(`${warnMessage}Starting the server`);
}

// ////////////////////////////////////////////////////////////// API END POINT HANDLERS


// Handler for the HTTP GET's coming into the server, the end points that we are handling are:
// /forum/get?thread=[param] - Gets the thread with the given ID
// /forum/get?board=[param]&order=[param] - Gets a list of posts in a board in a given order
// Since the forum allows unregistered users to access the site, there is no need for authentication here
app.get('/forum/get', (req, res) => {
  if (argv.logging) {
    console.log(`${getMessage} ${req.originalUrl} ${Date.now()} ${req.ip}`);
  }

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
  if (argv.logging) {
    console.log(`${postMessage} ${req.originalUrl} ${Date.now()} ${req.ip}`);
  }

  res.end();
});


// //////////////////////////////////////////////////////////////

// Catch-all for 404's
app.get('*', (req, res) => {
  res.end('Could not process request');
});

app.listen(8080);
