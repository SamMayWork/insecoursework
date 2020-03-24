const assert = require('assert');
const dbabs = require('../dbabstraction');
const rs = require('../reportingsystem');

describe('Reporting System DB Tests', () => {
  describe('reportPost', () => {
    it('Should set the reported field correctly for the post row d6804d59', async () => {
      dbabs.reportPost('d6804d59');
      const content = await dbabs.getPost('d6804d59');
      assert.equal(content.reported, true);
    });

    it('Should not crash if the row does not exist', async () => {
      assert.doesNotThrow(() => { dbabs.reportPost('DOESNOTE') });
    });
  });

  describe('reportComment', () => {
    it('Should set the reported field correct for the comment row 52362409', async () => {
      dbabs.reportComment('52362409');
      const content = await dbabs.getComment('52362409');
      assert.equal(content.reported, true);
    });

    it('Should not crash if the row does not exist', async () => {
      assert.doesNotThrow(() => { dbabs.reportComment('DOESNOTE') });
    });
  })
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
        body: {
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
  });

  describe('Report Comment', () => {
    it('Should set the reported field correctly for the row d27324aa', async () => {
      const req = {
        user: {
          emails: [
            { value: 'notuser@hostgator.com' },
          ],
        },
        body: {
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
  });
});