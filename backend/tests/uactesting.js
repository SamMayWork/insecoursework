const assert = require('assert');
const dbabs = require('../dbabstraction');
const uac = require('../useraccountsystem');

describe('UAC Module DB Testing', function () {
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

  describe('enrollUser', () => {
    it('Should return the users id and the users display name', async () => {
      const result = await dbabs.enrollUser('awesomeDisplayName', 'awesomeemail@gmail.com');
      console.log(result);
      console.log(await dbabs.getUser(result.id));
      console.log({
        user_id : result.id,
        user_displayname : 'awesomeDisplayName',
        user_userealname : true,
        user_email : 'awesomeemail@gmail.com',
        user_dateofregistration : result.insertionDate
      });
      assert.deepEqual(await dbabs.getUser(result), {
        user_id : result.id,
        user_displayname : 'awesomeDisplayName',
        user_userealname : true,
        user_email : 'awesomeemail@gmail.com',
        user_dateofregistration : result.insertionDate
      });
    });
  });

  describe('getUser', function () {
    it ('Should return undefined if the user does not exist', async function () {
      assert.equal(await dbabs.getUser('DOESNOTE'), undefined);
    });

    it ('Should return the correct content for the row a2367eab', async function () {
      assert.deepEqual(await dbabs.getUser('a2367eab'), {
        user_id : 'a2367eab',
        user_displayname : 'dish',
        user_userealname : true,
        user_email : 'sbaldock0@hostgator.com',
        user_dateofregistration : new Date('2020-02-07T00:00:00.000Z')
      });
    });
  });

  //assert.ok(result.user_name !== undefined && result.user_name !== undefined);

  ////////////////////////////////////////////////////////////// CREATE REPLY COMMENT

  // describe('createReplyComment', () => {
    //   let commentContent;
  //   it('Should return the expected id and content', async () =>{
  //     const result = await dbabs.createReplyComment('This is the reply comment that tests the reply comment function', '100bad41', '7c367dd6', 'he72ieq8');
  //     assert.ok(result.replyComment_id !== undefined && result.comment_content !== undefined);
  //     commentid = result.replyComment_id;
  //     commentContent = result.comment_content;
  //   });

  //   it('Should return correct information when comment is searched for', async() => {
  //     const result = await dbabs.getComment(commentid);
  //     assert.equal(commentContent, 'This is the reply comment that tests the reply comment function');
  //   });
  // });
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