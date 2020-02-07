// File created on 07/02/2020
//
// Logging file for the application, any important messages can be sent through
// this file to be properly printed onto the terminal with the appropriate highlighting

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const chalk = require('chalk');

// ////////////////////////////////////////////////////////////// LOGGING-CODE

const warnMessage = `${chalk.bgYellow.black('WARN')} `;
const getMessage = `${chalk.bgGreen.black('GET')} `;
const postMessage = `${chalk.bgRed.white('POST')} `;
const coldMessage = `${chalk.bgCyan.white('COLDSTART')} `;

/**
 * Prints a warning message to the screen with proper formatting
 * @param {string} message Message to be printed
 */
function warningMessage(message) {
  console.log(warnMessage + message);
}

/**
 * Prints a log for a HTTP POST to the screen
 * @param {HttpRequest} req The Request to print to the screen
 * @param {string} message Optional message to append to the end of logs
 */
function logHttpPostMessage(req, message = '') {
  console.log(`${postMessage} ${req.originalUrl} ${Date.now()} ${req.ip} ${message}`);
}

/**
 * Prints a log for a HTTP GET to the screen
 * @param {HttpRequest} req The Request to print to the screen
 * @param {string} message Optional message to append to the end of logs
 */
function logHttpGetMessage(req, message) {
  console.log(`${getMessage} ${req.originalUrl} ${Date.now()} ${req.ip} ${message}`);
}

/**
 * Prints cold-start logging information
 * @param {strimg} message
 */
function coldStartMessage(message) {
  console.log(`${coldMessage} ${message}`);
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.warningMessage = warningMessage;
module.exports.logHttpPostMessage = logHttpPostMessage;
module.exports.logHttpGetMessage = logHttpGetMessage;
module.exports.coldStartMessage = coldStartMessage;
