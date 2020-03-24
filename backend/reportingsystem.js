// File created on 01/03/2020

// This module is responsible for tracking and handling reports on the forum

// Since this is a prototype the functionality for this system has been implemented but
// it has been done in a way which does not scale with the system, this currently marks
// either a comment or post as reported and nothing else.


// ////////////////////////////////////////////////////////////// REQUIRES

const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// PUBLIC REPORTING FUNCTIONS

/**
 * Reports a given post
 * @param {request} req
 * @param {response} res
 */
async function reportPost(req, res) {
  await dbabs.reportPost(req.body.postid);
  res.status(200);
  res.end();
}

/**
 * Reports a given comment
 * @param {request} req
 * @param {response} res
 */
async function reportComment(req, res) {
  await dbabs.reportComment(req.body.commentid); 
  res.status(200);
  res.end();
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.reportPost = reportPost;
module.exports.reportComment = reportComment;
