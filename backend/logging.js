// File created on 07/02/2020
//
// Logging file for the application, any important messages can be sent through
// this file to be properly printed onto the terminal with the appropriate highlighting

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const chalk = require('chalk');

// ////////////////////////////////////////////////////////////// LOGGING-CODE

const warnStyle = `${chalk.bgYellow.black('WARN')} `;
const getStyle = `${chalk.bgGreen.black('GET')} `;
const postStyle = `${chalk.bgRed.white('POST')} `;
const coldStyle = `${chalk.bgCyan.white('COLDSTART')} `;
const successStyle = `${chalk.bgGreen.black('SUCCESS')} `;
const errorStyle = `${chalk.bgRed.white('ERROR')} `;

/**
 * Prints a warning message to the screen with proper formatting
 * @param {string} message Message to be printed
 */
function warningMessage(message) {
  console.log(warnStyle + message);
}

/**
 * Prints a log for a HTTP POST to the screen
 * @param {HttpRequest} req The Request to print to the screen
 * @param {string} message Optional message to append to the end of logs
 */
function logHttpPostMessage(req, message = '') {
  console.log(`${postStyle} ${req.originalUrl} ${Date.now()} ${req.ip} ${message}`);
}

/**
 * Prints a log for a HTTP GET to the screen
 * @param {HttpRequest} req The Request to print to the screen
 * @param {string} message Optional message to append to the end of logs
 */
function logHttpGetMessage(req, message) {
  console.log(`${getStyle} ${req.originalUrl} ${Date.now()} ${req.ip} ${message}`);
}

/**
 * Prints cold-start logging information
 * @param {string} message
 */
function coldStartMessage(message) {
  console.log(`${coldStyle} ${message}`);
}

/**
 * Prints a success message to the screen
 * @param {string} message Message to be printed to the screen
 */
function successMessage(message) {
  console.log(`${successStyle} ${message} `);
}

/**
 * Prints an error message to the screen
 * @param {string} message Message to be printed to the screen
 */
function errorMessage(message) {
  console.log(`${errorStyle} ${message} `);
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.warningMessage = warningMessage;
module.exports.logHttpPostMessage = logHttpPostMessage;
module.exports.logHttpGetMessage = logHttpGetMessage;
module.exports.coldStartMessage = coldStartMessage;
module.exports.successMessage = successMessage;
module.exports.errorMessage = errorMessage;
