// CREATED ON 25/02/2020

// This is the tests file for the dbabstraction.js file
//
// Tests are done using Mocha JS and are run using Travis CI

const assert = require('assert');
const dbabs = require('../dbabstraction');

// ////////////////////////////////////////////////////////////// CONNECTION TESTS

describe('dbabstraction Tests', function () {
  describe('getAllBoards', function () {
    it('Should return a result that is not undefined', async function () {
      let results = await dbabs.getAllBoards();
      assert.notEqual(results, undefined);
    });
  });
});
