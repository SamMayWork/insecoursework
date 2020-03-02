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
 * Stores a users' information inside of the database
 * @param {request} req
 * @param {response} res
 */
async function createUser(req, res) {
  try {
    const email = req.user.emails[0].value;
    const currentDate = new Date();
    dbabs.createUser(email, currentDate);
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

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.createUser = createUser;
module.exports.checkUserExists = checkUserExists;
