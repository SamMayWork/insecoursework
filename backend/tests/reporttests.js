const assert = require('assert');
const dbabs = require('../dbabstraction');
const rs = require('../reportingsystem');

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// File edited, linted, and commited ✔️

// ////////////////////////////////////////////////////////////// TEST FLOW
/*
Inside of this endpoint there are 4 methods:
  - Reporting a comment
  - Reporting a post
  - reportPost (DB)
  - reportComment (DB)

To test the DB functions we will perform:
  - A check to make sure it doesn't crash with normal data ✔️
  - A check to make sure it works correctly with normal data ✔️
  - A check to make sure it handles incorrect data correctly ✔️

To test the Module functions we will perform:
  - A check to make sure it works with correct data ✔️
  - A check to make sure it works with invalid data ✔️
*/
// ////////////////////////////////////////////////////////////// TEST SCRIPT

describe('Reporting System DB Tests', () => {
  describe('reportPost', () => {
    it('Should set the reported field correctly for the post row d6804d59', async () => {
      await dbabs.reportPost('d6804d59');
      const content = await dbabs.getPost('d6804d59');
      assert.equal(content.reported, true);
    });

    it('Should not crash if the row does exist', async () => {
      assert.doesNotThrow(() => { dbabs.reportPost('a20241c7'); });
    });

    it('Should not crash if the row does not exist', async () => {
      assert.doesNotThrow(() => { dbabs.reportPost('DOESNOTE'); });
    });
  });

  describe('reportComment', () => {
    it('Should set the reported field correct for the comment row 52362409', async () => {
      await dbabs.reportComment('52362409');
      const content = await dbabs.getComment('52362409');
      assert.equal(content.reported, true);
    });

    it('Should not crash if the row does exist', async () => {
      assert.doesNotThrow(() => { dbabs.reportComment('45594aae'); });
    });

    it('Should not crash if the row does not exist', async () => {
      assert.doesNotThrow(() => { dbabs.reportComment('DOESNOTE'); });
    });
  });
});

describe('Reporting System Module Tests', () => {
  describe('Report Post', () => {
    it('Should set the reported field correctly for the row a20241c7', async () => {
      const req = {
        user: {
          emails: [
            { value: 'notuser@hostgator.com' },
          ],
        },
        query: {
          postid: 'a20241c7',
        },
      };

      const res = {
        status(value) {},
        end() {},
      };

      await rs.reportPost(req, res);
      const content = await dbabs.getPost('a20241c7');
      assert.equal(content.reported, true);
    });

    it('Should not crash if the supplied data is incorrect', async () => {
      assert.doesNotThrow(async () => {
        const req = {
          user: {
            emails: [
              { value: 'notuser@hostgator.com' },
            ],
          },
          query: {
            postid: 'DOESNOTE',
          },
        };

        const res = {
          status(value) {},
          end() {},
        };

        await rs.reportPost(req, res);
        const content = await dbabs.getPost('DOESNOTE');
      });
    });
  });

  describe('Report Comment', () => {
    it('Should set the reported field correctly for the row d27324aa', async () => {
      const req = {
        user: {
          emails: [
            { value: 'notuser@hostgator.com' },
          ],
        },
        query: {
          commentid: 'd27324aa',
        },
      };

      const res = {
        status(value) {},
        end() {},
      };

      await rs.reportComment(req, res);
      const content = await dbabs.getComment('d27324aa');
      assert.equal(content.reported, true);
    });

    it('Should not crash if the supplied row is incorrect', async () => {
      assert.doesNotThrow(async () => {
        const req = {
          user: {
            emails: [
              { value: 'notuser@hostgator.com' },
            ],
          },
          query: {
            commentid: 'DOESNOTE',
          },
        };

        const res = {
          status(value) {},
          end() {},
        };

        await rs.reportComment(req, res);
        const content = await dbabs.getComment('DOESNOTE');
      });
    });
  });
});
