// Created on 07/02/2020
//
// This module is responsible for the cold-start operation of the
// system. This operation should be run anually to create all of
// the new boards

const logging = require('./logging');
const dbabs = require('./dbabstraction');
const modules = require('./modules');

// ////////////////////////////////////////////////////////////// MAINTAIN MODULE

/**
 * Starts the cold-start procedure for the forum by creating boards for all of the modules inside
 * of the application
 */
function coldStart() {
  for (const imodule of moduleInformation.modules) {
    const yearString = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;
    dbabs.createBoard(imodule, yearString);
    logging.coldStartMessage(`Created board for ${imodule} of year ${yearString}`);
  }
}

module.exports.coldStart = coldStart;
