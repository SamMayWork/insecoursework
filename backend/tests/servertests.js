// CREATED ON 25/02/2020

// This is the tests file for the dbabstraction.js file
//
// Tests are done using Mocha JS and are run using Travis CI

const assert = require('assert');
const dbabs = require('../dbabstraction');

// ////////////////////////////////////////////////////////////// CONNECTION TESTS

describe('dbabstraction Tests', function () {
  describe('initialiseDB', function () {
    it('Should create a connection to the DB when called', function () {
      let connection = dbabs.initialiseDB(connection);
      assert.notEqual(connection, undefined);
    });
  });
});
