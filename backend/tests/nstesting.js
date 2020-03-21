// const assert = require('assert');
// const ns = require('../notificationsystem');

// // For the sake of my inbox these tests are not run automatically by Travis, and need
// // to be run manually. Please think about me before you test this file :)

// // If you do feel the need to test this file, remove all of the commented tests below
// // and please for the sake of my inbox change the email below here to your own one!

// const testEmail = 'up891153@myport.ac.uk';

// describe('Notification Module Email Testing', () => {
// describe('sendEmail', ()  => {
// it('Should not throw errors', () => {
// assert.doesNotThrow(async () => { await ns.sendEmail(testEmail, "INSE Test", "Hello, Sam!"); });
// });

// it('Should not return undefined for the return id', async () => {
// let result = await ns.sendEmail(testEmail, "INSE Test", "Hello, Sam!");
// assert.notEqual(result, undefined);
// });
// });

// describe('generatePostConfirmation', async () => {
// it('Should not crash when correct data is passed in', async () => {
// const req = {
// user: {
// emails: [
// { value: testEmail },
// ],
// }
// }

// let status = 0;
// assert.doesNotThrow(async () => {
// status = await ns.generatePostConfirmation(req, '47160ce5');
// });
// });

// it('Should return the correct status code for valid data', async () => {
// const req = {
// user: {
// emails: [
// { value: testEmail },
// ],
// }
// }
// const result = await ns.generatePostConfirmation(req, '47160ce5');
// assert.equal(result, 252);
// });

// it('Should return the correct status code when the email address is invalid', async () => {
// const req = {
// user: {
// emails: [
// { value: 'thisisnotanemailthatshouldworkproperly' },
// ],
// }
// }

// const result = await ns.generatePostConfirmation(req, '47160ce5');
// assert.equal(result, 111)
// });

// it('Should return the correct status code when the post ID is invalid', async () => {
// const req = {
// user: {
// emails: [
// { value: testEmail },
// ],
// }
// }

// const result = await ns.generatePostConfirmation(req, 'DOESNOTE');
// assert.equal(result, 101)
// });
// });
// });
