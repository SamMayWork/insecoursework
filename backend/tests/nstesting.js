const ns = require('../notificationsystem');
const assert = require('assert');

// For the sake of my inbox these tests are not run automatically by Travis, and need
// to be run manually. Please think about me before you test this file :)

const testEmail = "up891153@myport.ac.uk"

describe('Notification Module Email Testing', () => {
  describe('sendEmail', ()  => {
    it('Should not throw errors', () => {
      assert.doesNotThrow(async () => { await ns.sendEmail(testEmail, "INSE Test", "Hello, Sam!"); });
    });

    it('Should not return undefined for the return id', async () => {
      let result = await ns.sendEmail(testEmail, "INSE Test", "Hello, Sam!");
      assert.notEqual(result, undefined);
    });
  });
});