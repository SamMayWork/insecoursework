// Created on 07/02/2020
//
// This module is responsible for the cold-start procedure for the application
// and is also repsonsible for creating all of the new boards anually

const logging = require('./logging');
const dbabs = require('./dbabstraction');
const modules = require('./modules');

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// MAINTAIN MODULE

/**
 * Starts the cold-start prodedure for the forum by creating boards for all of the modules inside
 * of the application
 */
function coldStart() {
  for (const imodule of moduleInformation.modules) {
    const yearString = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;
    dbabs.createBoard(imodule, yearString);
    logging.coldStartMessage(`Created board for ${imodule} of year ${yearString}`);
  }
}

/**
 * Performs a soft reset on the DB, deleting all of the records but preserving the structure
 *
 * Please know what you're doing if you enable this option on startup.
 */
function softReset() {
  dbabs.deleteAllStoredContent();
}

module.exports.coldStart = coldStart;
module.exports.softReset = softReset;
