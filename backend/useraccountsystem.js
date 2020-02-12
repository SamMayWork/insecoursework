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
 * Indicates whether a given user ID exists inside of the database
 * @param {request} req The Request from the user
 * @param {response} res The Response to the user
 */
async function checkUserExists(req, res) {
  const id = req.body.id;
  const exists = await dbabs.checkUserExists(id);
  res.json({
    userexists : exists,
    userid : id
  });
  res.status(200);
  res.end();
}

// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.checkUserExists = checkUserExists;
module.exports.createUser = createUser;