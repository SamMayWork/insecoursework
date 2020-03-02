// File created on 01/03/2020

// This module is responsible for tracking and handling reports on the forum

// ////////////////////////////////////////////////////////////// REQUIRES

const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// PUBLIC REPORTING FUNCTIONS

/**
 * Reports a given post
 * @param {request} req 
 * @param {response} res 
 */
async function reportPost (req, res) {
  // 1 - Check the user is authorised to report the content
  // 2 - Check to see if the user has already reported the content before
  //  2.a - If the content has never been reported before by anyone, start the report procedure

}

/**
 * Reports a given comment
 * @param {request} req 
 * @param {response} res 
 */
async function reportComment (req, res) {

}

