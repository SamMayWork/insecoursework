// Tests for the Maintenance Module, function listing:
//
// coldStart
//    - Tests for does not throw
//    - Tests to make sure some of the rows have been inserted properly

const assert = require('assert');
const dbabs = require('../dbabstraction');
const mm = require('../maintainmodule');

// ////////////////////////////////////////////////////////////// ESLINT DISABLES

/* eslint-disable no-undef */

// ////////////////////////////////////////////////////////////// MMM TESTING

describe('Maintenance Module', () => {
  describe('Cold Start Procedure', () => {
    it('Should not throw any errors', async () => {
      assert.doesNotThrow(mm.coldStart, Error, 'Error Thrown');
    });

    it('Should insert the rows correctly', async () => {
      const query = "SELECT * FROM Board WHERE board_module = 'Educational Computing';";
      assert.deepEqual((await dbabs.executeRawQuerySync(query)).rowCount, 1);
    });
  });
});
