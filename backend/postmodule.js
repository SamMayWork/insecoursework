// Created on 11/02/2020
//
// This is the module that is responsible for all of the actions related to
// the post management system (PMS) inside of the system architecture

const logging = require('./logging');
const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// POSTS

/**
 * Function to get a given post and return it to the user
 * @param {request} req The Request from the user 
 * @param {response} res The response to the user
 */
function getPost (req, res) { 
  const id = req.query.thread;
  logging.warningMessage(id);
  const result = dbabs.getPost(id);
  res.json(result);
  res.end();
}

module.exports.getPost = getPost;