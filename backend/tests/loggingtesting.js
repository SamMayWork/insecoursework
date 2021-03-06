// All of the tests for the logging module, since there is no DB
// testing for this module and since none of the functions do anything
// that can crash the system this is just a visual check to make sure
// that all of the functions are printing correctly.

const assert = require('assert');
const logging = require('../logging');

// ////////////////////////////////////////////////////////////// TEST FLOW

// Checks to make sure it prints to the screen correctly and does not crash ✔️

// ////////////////////////////////////////////////////////////// TEST SCRIPT

describe('logging tests', () => {
  it('Should have all different text methods appear correctly', () => {
    logging.coldStartMessage('This should be a cold-start message!');
    logging.errorMessage('This should be an error message!');
    logging.logHttpGetMessage({}, 'This should be a HTTP GET message!');
    logging.logHttpPostMessage({}, 'This should be a HTTP POST message!');
    logging.successMessage('This should be a success message!');
    logging.warningMessage('This should be a warning message!');
    assert.ok(true);
  });

  it('Should not crash at all', async () => {
    assert.doesNotThrow(() => {
      logging.coldStartMessage('This should be a cold-start message!');
      logging.errorMessage('This should be an error message!');
      logging.logHttpGetMessage({}, 'This should be a HTTP GET message!');
      logging.logHttpPostMessage({}, 'This should be a HTTP POST message!');
      logging.successMessage('This should be a success message!');
      logging.warningMessage('This should be a warning message!');
    });
  });
});
