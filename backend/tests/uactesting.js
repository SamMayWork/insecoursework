const assert = require('assert');
const dbabs = require('../dbabstraction');
const uac = require('../useraccountsystem');

describe('UAC Module DB Testing', function () {
  // describe('enrollUser', function () {
  //   it('Should return the users id and the users display name', async () => {
  //     const result = await dbabs.enrollUser('awesomeDisplayname', 'awesomeemail@gmail.com');
  //     assert.ok(result.user_name !== undefined && result.user_name !== undefined);
  //     assert.deepEqual(result, {
  //       user_name: 'awesomeDisplayname',
  //       user_email: 'awesomeemail@gmail.com'});
  //   });
  // });

  describe('checkUserExists', function () {
    it('Should return true for the email sbaldock0@hostgator.com', async function () {
      assert.equal(await dbabs.checkUserExists('sbaldock0@hostgator.com'), true);
    });

    it('Should return false for the email thisisfake@fake.com', async function () {
      assert.equal(await dbabs.checkUserExists('thisisfake@fake.com'), false);
    });
  });

  describe('getDisplayNameById', function () {
    it('Should return the display name "out" for the id df3a26cf', async function () {
      assert.equal(await dbabs.getDisplayNameById('df3a26cf'), 'out');
    });

    it('Should return undefined for a user account that does not exist', async function () {
      assert.equal(await dbabs.getDisplayNameById('DOESNOTE'), undefined);
    });

    it('Should return the email address eallso5@ask.com for the row 6071154c', async function () {
      assert.equal(await dbabs.getDisplayNameById('6071154c'), 'eallso5@ask.com');
    });
  });

  describe('changeName', function () {
    it('Should update change the value of userealname and return the displayname', async function () {
      dbabs.useRealName('a2367eab', true);
      assert.equal(await dbabs.getDisplayNameById('a2367eab'), 'dish');
    });
  });
});

describe('UAC Module Testing', function () {

  describe ('useRealName', function () {
    it('Should switch between using the users real name and their ID', async function () {
      let req = {
        user : {
          emails : [
            { value : 'sbaldock0@hostgator.com' }
          ]
        },
        body : {
          status : false
        }
      }

      let res = {
        status : function (value) {},
        end : function () {}
      }

      let displayname = await dbabs.getDisplayNameById('a2367eab');
      uac.useRealName(req, res);
      assert.equal(displayname, await dbabs.getDisplayNameById('a2367eab'));
    });

    it('Should not throw and error if the user does not exist', async function () {
      let req = {
        user : {
          emails : [
            { value : 'notuser@hostgator.com' }
          ]
        },
        body : {
          status : false
        }
      }

      let res = {
        status : function (value) {},
        end : function () {}
      }

      assert.doesNotThrow(() => {uac.useRealName(req, res)});
    });
  });

  describe ('checkUserExists', function () {
    it('Should return true for the email sbaldock0@hostgator.com', async function () {
      assert.equal(await dbabs.checkUserExists('sbaldock0@hostgator.com'), true);
    });

    it('Should return false for the email fake@notinthedb.com', async function () {
      assert.equal(await dbabs.checkUserExists('fake@notinthedb.com'), false);
    });
  });

  describe ('getCommentAuthor', function () {
    it('Should return the ID 75b6d7e5 for the row q1f3b99f', async function () {
      assert.equal(await uac.getCommentAuthor('q1f3b99f'), '75b6d7e5');
    });

    it('Should return undefined if the row does not exist', async function () {
      assert.equal(await uac.getCommentAuthor('DOESNOTE'), undefined);
    });
  });

  describe ('getPostAuthor', function () {
    it('Should return the ID acc45ba4 for the row 11f3b99f', async function () {
      assert.equal(await uac.getPostAuthor('11f3b99f'), 'acc45ba4');
    });

    it('Should return undefined if the row does not exist', async function () {
      assert.equal(await uac.getPostAuthor('DOESNOTE'), undefined);
    });
  });
});