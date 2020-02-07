// Created on 07/02/2020
//
// This module is responsible for the cold-start procedure for the application
// and is also repsonsible for creating all of the new boards anually

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// MAINTAIN MODULE

const logging = require('./logging');


function coldStart () {
  logging.coldStartMessage("Cold-start option selected, running cold-start procedure...");
}

module.exports.coldStart = coldStart;