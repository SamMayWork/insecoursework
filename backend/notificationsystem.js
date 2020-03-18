// File created on 17/02/2020

// This file is responsible for receiving messages and sending notifications
// out to the target using, any module can call it and it interfaces with the
// email API and with dbabs itself

// ////////////////////////////////////////////////////////////// REQUIRES

const dbabs = require('./dbabstraction');
const mailer = require('nodemailer');
const login = require('../emaillogin');
const logging = require('./logging');

let available = true;
let transporter;

// ////////////////////////////////////////////////////////////// CONNECTION GENERATOR

function startConnection () {
  try {
    transporter = mailer.createTransport({
      service : 'gmail',
      auth : {
        user : emailinformation.email,
        pass : emailinformation.password
      }
    });
  } catch (exception) {
    available = false;
    logging.errorMessage(exception);
    logging.errorMessage("Email Spin-up failed, continuing without mailing services");
    logging.warningMessage("(Have you made sure you've got an emaillogin.js file?)");
  }
}

startConnection();

// ////////////////////////////////////////////////////////////// EMAIL-SENDER

/**
 * Generates and sends an SMTP email
 * @param {string} email Email address to send to
 * @param {string} subject Subject line 
 * @param {string} message Content of the email (plaintext only currently)
 * 
 * @returns A JSON object containing a status code (.code) and a messageId if successful
 */
async function sendEmail (email, subject, message) {
  if (!available) {
    logging.errorMessage("Email functionality has been turned off");
    return {
      code : 101
    };
  }

  try {
    let info = await transporter.sendMail({
      from : "inseforum@gmail.com",
      to : email,
      subject : subject,
      text : message
    });
    return {
      id : info.messageId,
      code : 252
    }
  } catch (exception) {
    logging.errorMessage(exception);
    return {
      code : 111
    };
  }
}

/**
 * Changes the status of email sending from the notification module
 * @param {boolean} status 
 */
function emailAvailableStatus (status) {
  available = status;
}

// ////////////////////////////////////////////////////////////// EMAIL-GENERATORS

/**
 * Generates an email to the request address using only the provided message parameter
 * @param {request} req 
 * @param {string} message Message to send to the user
 */
async function generateGenericEmail(req, subject, message) {
  const content = `Hi, ${await dbabs.getDisplayNameById(await dbabs.getUserId(req.user.emails[0].value))}\n${message}`;
  const result = await sendEmail(req.user.emails[0].value, `UoP Forum ${subject}`, content);
  return result.code;
}

async function generatePostConfirmation(req, postid) {
  const content = `Hi `
}



// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.emailAvailableStatus = emailAvailableStatus;

module.exports.generateGenericEmail = generateGenericEmail;

module.exports.sendEmail = sendEmail;
