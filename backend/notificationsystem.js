// File created on 17/02/2020

// This file is responsible for receiving messages and sending notifications
// out to the target using, any module can call it and it interfaces with the
// email API and with dbabs itself

// Status Codes
// 252 - Everything went alright but we're not confirming the address is correct
// 111 - Client Error
// 101 - Connection blocked

// ////////////////////////////////////////////////////////////// REQUIRES

const mailer = require('nodemailer');
const dbabs = require('./dbabstraction');
// const login = require('../emaillogin');
const logging = require('./logging');

let available = true;
let transporter;

// ////////////////////////////////////////////////////////////// CONNECTION GENERATOR

function startConnection() {
  try {
    transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailinformation.email,
        pass: emailinformation.password,
      },
    });
  } catch (exception) {
    available = false;
    logging.errorMessage(exception);
    logging.errorMessage('Email Spin-up failed, continuing without mailing services');
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
async function sendEmail(email, subject, message) {
  if (!available) {
    logging.errorMessage('Email functionality has been turned off');
    return {
      code: 101,
    };
  }

  try {
    const info = await transporter.sendMail({
      from: 'inseforum@gmail.com',
      to: email,
      subject,
      text: message,
    });
    return {
      id: info.messageId,
      code: 252,
    };
  } catch (exception) {
    logging.errorMessage(exception);
    return {
      code: 111,
    };
  }
}

/**
 * Changes the status of email sending from the notification module
 * @param {boolean} status
 */
function emailAvailableStatus(status) {
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

/**
 * Sends an emai to the user when their post has been successfully created
 * @param {request} req
 * @param {string} postid ID of the created post
 */
async function generatePostConfirmation(req, postid) {
  const postInformation = await dbabs.getPost(postid);
  if (postInformation === undefined || await !dbabs.checkUserExists(req.user.emails[0].value)) {
    return 101;
  }
  let content = `Hi ${await dbabs.getDisplayNameByEmail(req.user.emails[0].value)},\n\n`;
  content += `We're sending you this email to confirm ✔️ that "${postInformation.post_title}" was posted on ${postInformation.created_date}\n\n`;
  content += 'Thanks, (Unofficial)UoP Forum team\n\nBleep Bloop I am a robot 🤖, report any errors ❌ to up891153@myport.ac.uk';
  const result = await sendEmail(req.user.emails[0].value, 'Post Confirmation!', content);
  return result.code;
}


// ////////////////////////////////////////////////////////////// EXPORTS

module.exports.emailAvailableStatus = emailAvailableStatus;

module.exports.generateGenericEmail = generateGenericEmail;
module.exports.generatePostConfirmation = generatePostConfirmation;

module.exports.sendEmail = sendEmail;
