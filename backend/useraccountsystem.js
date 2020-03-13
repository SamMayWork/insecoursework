// Created on 12/02/2020
//
// This is User Account System for the forum backend.
// Its main purpose is to create/delete user account but it also provides authentication
// services

// ////////////////////////////////////////////////////////////// REQUIRES

const dbabs = require('./dbabstraction');
const logging = require('./logging');

// ////////////////////////////////////////////////////////////// CREATING USERS

/**
 * Enrolls a user in the DB
 * @param {request} req 
 * @param {response} res 
 */
async function enrollUser (req, res) {
  try {
    if (checkUserExists(req) === true) {
      throw new error();
    } else {
      const userInformation = {
        displayName : req.user.displayName,
        email : req.user.emails[0].value
      }
      dbabs.enrollUser(userInformation);
      res.status(200);
      res.end();
    }
  } catch (exception) {
    res.status(500);
    res.end();
  }
}

// ////////////////////////////////////////////////////////////// AUTHORISATION

/**
 * Checks users email exsists inside of our database
 * @param {request} req
 */
async function checkUserExists(req) {
  try {
    return await (dbabs.checkUserExists(req.user.emails[0].value)).exists;
  } catch (exception) {
    logging.warningMessage(exception);
    return false;
  }
}

/**
 * Gets the ID of the user from a request
 * @param {request} req
 */
async function getUsersID(req) {
  try {
    return await (dbabs.checkUserExists(req.user.emails[0].value)).id;
  } catch (exception) {
    return undefined;
  }
}

/**
 * Gets the author ID of a given post
 * @param {string} postid
 */
async function getPostAuthor(postid) {
  return dbabs.getPostAuthor(postid).user_id;
}

/**
 * Gets the author ID of a given comment
 * @param {string} commentid
 */
async function getCommentAuthor(commentid) {
  return dbabs.getCommentAuthor(commentid).user_id;
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.enrollUser = enrollUser;

module.exports.checkUserExists = checkUserExists;
module.exports.getUsersID = getUsersID;
module.exports.getPostAuthor = getPostAuthor;
module.exports.getCommentAuthor = getCommentAuthor;
