// CREATED ON 25/02/2020

// This is the tests file for the dbabstraction.js file
//
// Tests are done using Mocha JS and are run using Travis CI

const assert = require('assert');
const dbabs = require('../dbabstraction');
const logging = require('../logging');
const mm = require("../maintainmodule");

// ////////////////////////////////////////////////////////////// CONNECTION TESTS

describe('logging tests', function () {
  it('Should have all different text methods appear correctly', function () {
    logging.coldStartMessage('This should be a cold-start message!');
    logging.errorMessage('This should be an error message!');
    logging.logHttpGetMessage({}, 'This should be a HTTP GET message!');
    logging.logHttpPostMessage({}, 'This should be a HTTP POST message!');
    logging.successMessage('This should be a success message!');
    logging.warningMessage('This should be a warning message!');
    assert.ok(true);
  });
});

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

  describe('getPost', function(){
    it('Should return the post content for the given postID', async function(){
      let results = await dbabs.getPost('3e645059');
      assert.deepEqual(results,  {
        post_id : '3e645059',
        keyword_id : 'faf7c6b9',
        post_title : 'safety clock closer doubt',
        post_content : 'buffalo row statement pan fellow adjective hurry thread short sure news screen create nearer numeral power her twelve nuts apart control flat street brave love blue trail valley though carried somehow hurried speak fall ruler possibly happened nothing is log shake plastic silence send attack yourself hair careful',
        post_likes: 95,
        user_id : 'ca77860f',
        created_date : '12/2/2115',
        edited_date : '9/24/2077'
      });
    });
  });

  describe('getPost', function () {
    it('Should not return undefined for row for ID 11f3b99f', async function () {
      let result = await dbabs.getPost('11f3b99f');
      assert.notEqual(result, undefined);
    });

    it('Should return the expected content for the row 11f3b99f', async function () {
      let result = await dbabs.getPost('11f3b99f');
      assert.deepEqual(result, {
        post_id : '11f3b99f',
        keyword_id : '986fcdbe',
        post_title : 'stems till wore stretch',
        post_content : 'exclaimed scene ice game also closer became law damage hold mail hour care give definition spread bent step walk modern mad whole beautiful your tank sense cold picture listen hunt phrase construction grade direction shaking fastened summer chair purpose birds herd safety discover toward folks nature talk truck',
        post_likes : 10,
        user_id : 'acc45ba4',
        created_date : new Date('2020-02-02T00:00:00.000Z'),
        edited_date : new Date('2020-02-06T00:00:00.000Z')
      });
    });

    it('Should return undefined if the post does not exist', async function () {
      let result = await dbabs.getPost('DOESNOTE');
      assert.equal(result, undefined);
    })
  });

  describe('createPost', function() {
    it('Should return the expected content for the row ', async function (){
      dbabs.createPost('This is the title for createpost test', 'Heres more content to try to test this createPost function!!!', '100bad41', '7c3263e6');
      let result = dbabs.executeRawQuerySync('select * from posts where post_title = 'This is the title for createpost test';')
      assert.deepEqual(result, {
        post_title : 'This is the title for createpost test',
        post_content :  'Heres more content to try to test this createPost function!!!',
        post_likes : 0,
        user_id : '100bad41',
        created_date : new Date('2020-02-17T00:00:00.000Z'),
        edited_date : new Date('2020-05-15T00:00:00.000Z')
      });
    });
  });
});

describe("Maintenance Module", function () {
  describe("Cold Start Procedure", function () {
    it("Should not throw any errors", async function () {
      assert.doesNotThrow(mm.coldStart, Error, "Error Thrown");
    });
  });
});