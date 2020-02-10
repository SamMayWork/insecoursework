// Created on 07/02/2020
//
// This module is responsible for the cold-start procedure for the application
// and is also repsonsible for creating all of the new boards anually

const logging = require('./logging');
const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// ESLINT-DISABLES

/* eslint-disable no-use-before-define */

// ////////////////////////////////////////////////////////////// BOARDS

modules = [
  "Introduction to Software Engineering",
  "Data Structures and Algorithms",
  "Computer Architecture",
  "Web Foundations 1"
];

// ////////////////////////////////////////////////////////////// MAINTAIN MODULE

function coldStart () {
  logging.coldStartMessage("Cold-start option selected, running cold-start procedure...");

  logging.coldStartMessage('Starting to create boards...');

  for (let imodule of modules) {
    const yearString = `${new Date().getFullYear()}/${new Date().getFullYear()+1}`;
    //dbabs.createBoard(imodule, yearString);
    logging.coldStartMessage(`Created board for ${imodule} of year ${yearString}`);
  }
}

module.exports.coldStart = coldStart;