// Created on 12/02/2020
//
// This module represents the user account system for the application, it handles
// the authorisation for user activities, it can also create and delete users/

const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// CREATING USERS

/**
 * Creates a user inside of the database
 * @param {request} req The Request from the user
 * @param {response} res The Response to the user
 */
async function createUser(req, res) {

}

// ////////////////////////////////////////////////////////////// GENERAL QUERIES

/**
 * Checks to see if we have a record of the email address of the selected user
 * @param {request} req 
 */
async function checkUserExists (req)  {
  return await dbabs.checkUserExists();
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.checkUserExists = checkUserExists;
module.exports.createUser = createUser;