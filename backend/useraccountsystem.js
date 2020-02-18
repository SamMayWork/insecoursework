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
 * Checks to see if the signed-in user is authorised inside of the Database
 * (i.e. if their UP number exists within our database)
 * 
 * THIS ONLY CHECKS IF WE'VE GOT A RECORD OF THEIR EMAIL ADDRESS, IT IS NOT PROPER AUTH
 * @param {request} req The Request from the user
 */
async function checkUserExists(req) {
  let exists;
  if (req.user.emails[0].value != undefined) {
    exists = await dbabs.checkEmail();
  }

  return { "exists" : exists };
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.checkUserExists = checkUserExists;
module.exports.createUser = createUser;