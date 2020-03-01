// Created on 12/02/2020
//
// This is User Account System for the forum backend.
// Its main purpose is to create/delete user account but it also provides authentication
// services

const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// CREATING USERS

/**
 * Stores a users' information inside of the database
 * @param {request} req 
 * @param {response} res 
 */
async function createUser (req, res) {
  try {
    const email = req.user.emails[0].value;
    const currentDate = new Date();
    dbabs.createUser(email, currentDate);
  } catch (exception) {
    res.status(500);
    res.end(); 
  }
}
