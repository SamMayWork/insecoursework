// Created on 12/02/2020
//
// This is the User Account System file for the backend, all of the converting between
// ID's happens here along with all of the enrolling and deletion

// ////////////////////////////////////////////////////////////// REQUIRES

const dbabs = require('./dbabstraction');
const logging = require('./logging');

// ////////////////////////////////////////////////////////////// CREATING USERS

/**
 * Enrolls a new user in the DB using the information provided in the
 * authenticated request
 * @param {request} req
 * @param {response} res
 * @
 */
async function enrollUser(req, res) {
  try {
    if (checkUserExists(req) === true) {
      throw new error();
    } else {
      dbabs.enrollUser(req.user.displayName, req.user.emails[0].value);
      res.status(200);
      res.end();
    }
  } catch (exception) {
    res.status(500);
    res.end();
  }
}

// ////////////////////////////////////////////////////////////// DELETING USERS

/**
 * Deletes a user from the database
 * @param {request} req
 * @param {response} res
 */
async function deleteUser(req, res) {
  try {
    if (checkUserExists(req) === false) {
      res.status(403);
      res.end();
      return;
    }

    // If the caller requires a hard-delete we need to remove all data for a given
    // user, otherwise change their displayname and email to be the ID of the row

    if (req.body.hardDelete === true) {
      await dbabs.hardDeleteUser(getUsersID(req));
    } else {
      await dbabs.softDeleteUser(getUsersID(req));
    }
  } catch (exception) {
    res.status(500);
    res.end();
  }
}

// ////////////////////////////////////////////////////////////// PREFERENCES

/**
 * Allows a user to change between using their real name and their UP number
 * @param {request} req
 * @param {response} res
 */
async function changeDisplayName(req, res) {
  try {
    if (checkUserExists(req) === false) {
      res.status(403);
      res.end();
      return;
    }

    await dbabs.changeName(getUsersID(req), req.body.status);
    res.status(200);
    res.end();
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
    return await dbabs.checkUserExists(req.user.emails[0].value);
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
  return dbabs.getPostAuthor(postid);
}

/**
 * Gets the author ID of a given comment
 * @param {string} commentid
 */
async function getCommentAuthor(commentid) {
  return dbabs.getCommentAuthor(commentid);
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.enrollUser = enrollUser;

module.exports.changeDisplayName = changeDisplayName;

module.exports.deleteUser = deleteUser;

module.exports.checkUserExists = checkUserExists;
module.exports.getUsersID = getUsersID;
module.exports.getPostAuthor = getPostAuthor;
module.exports.getCommentAuthor = getCommentAuthor;
