const assert = require('assert');
const dbabs = require('../dbabstraction');
const mm = require('../maintainmodule');

describe('Maintenance Module', function () {
  describe('Cold Start Procedure', function () {
    it('Should not throw any errors', async function () {
      assert.doesNotThrow(mm.coldStart, Error, 'Error Thrown');
    });
  });
});