// CREATED ON 25/02/2020

// This is the tests file for the dbabstraction.js file
//
// Tests are done using Mocha JS and are run using Travis CI

const assert = require('assert');
const dbabs = require('../dbabstraction');

// ////////////////////////////////////////////////////////////// CONNECTION TESTS

describe('dbabstraction Tests', function () {
  
  describe('getBoard', function () {
    it('Should return all of the content for the given board', async function () {
      let results = await dbabs.getBoard('d7227788');
      assert.deepEqual(results.rows[0], {
        board_id : 'd7227788',
        board_module : 'Introduction to India',
        board_year : '2020/2021'
      });
    });

    it('Should return only one row', async function () {
      let results = await dbabs.getBoard('d7227788');
      assert.equal(results.rows.length, 1);
    });
  });

  describe('getAllBoards', function () {
    it('Should return a result that is not undefined', async function () {
      let results = await dbabs.getAllBoards();
      assert.notEqual(results.rows, undefined);
    });

    it('Should return the module bf35c787 within the first row of the response', async function () {
      let results = await dbabs.getAllBoards();
      assert.equal(results.rows[0].board_id, 'bf35c787');
    });

    it('Should return all of the contents of the row correctly', async function () {
      let results = await dbabs.getAllBoards();
      assert.deepEqual([results.rows[0].board_id, results.rows[0].board_module, results.rows[0].board_year], ['bf35c787', 'Introduction to Hong Kong SAR China', '2020/2021']);
    });

    it('Should return all of the rows in the database', async function () {
      let results = await dbabs.getAllBoards();
      assert.equal(results.rows.length, 20);
    });
  });

  describe('generateId', function () {
    it('Should return a random string that is the provided amount of characters in length', function () {
      let result = dbabs.generateId(8);
      assert.equal(result.length, 8);
    });

    it('Should return undefined for any length value that is <= 0', function () {
      let result = dbabs.generateId(-1);
      assert.equal(result, undefined);
    });
  });
});