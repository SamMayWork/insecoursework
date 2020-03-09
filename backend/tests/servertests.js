// CREATED ON 25/02/2020

// This is the tests file for the dbabstraction.js file
//
// Tests are done using Mocha JS and are run using Travis CI

const assert = require('assert');
const dbabs = require('../dbabstraction');
const logging = require('../logging');
const mm = require('../maintainmodule');

// ////////////////////////////////////////////////////////////// CONNECTION TESTS

describe('logging tests', () => {
  it('Should have all different text methods appear correctly', () => {
    logging.coldStartMessage('This should be a cold-start message!');
    logging.errorMessage('This should be an error message!');
    logging.logHttpGetMessage({}, 'This should be a HTTP GET message!');
    logging.logHttpPostMessage({}, 'This should be a HTTP POST message!');
    logging.successMessage('This should be a success message!');
    logging.warningMessage('This should be a warning message!');
    assert.ok(true);
  });
});

describe('dbabstraction Tests', () => {
  describe('getBoard', () => {
    it('Should return all of the content for the given board', async () => {
      const results = await dbabs.getBoard('d7227788');
      assert.deepEqual(results, {
        board_id: 'd7227788',
        board_module: 'Introduction to India',
        board_year: '2020/2021',
      });
    });

    it('Should not return undefined', async () => {
      const results = await dbabs.getBoard('d7227788');
      assert.notEqual(results, undefined);
    });
  });

  describe('getAllBoards', () => {
    it('Should return a result that is not undefined', async () => {
      const results = await dbabs.getAllBoards();
      assert.notEqual(results, undefined);
    });

    it('Should return the module bf35c787 within the first row of the response', async () => {
      const results = await dbabs.getAllBoards();
      assert.equal(results[0].board_id, 'bf35c787');
    });

    it('Should return all of the contents of the row correctly', async () => {
      const results = await dbabs.getAllBoards();
      assert.deepEqual([results[0].board_id, results[0].board_module, results[0].board_year], ['bf35c787', 'Introduction to Hong Kong SAR China', '2020/2021']);
    });

    it('Should return all of the rows in the database', async () => {
      const results = await dbabs.getAllBoards();
      assert.equal(results.length, 20);
    });
  });

  describe('generateId', () => {
    it('Should return a random string that is the provided amount of characters in length', () => {
      const result = dbabs.generateId(8);
      assert.equal(result.length, 8);
    });

    it('Should return undefined for any length value that is <= 0', () => {
      const result = dbabs.generateId(-1);
      assert.equal(result, undefined);
    });
  });


  describe('getPost', () => {
    it('Should not return undefined for row for ID 11f3b99f', async () => {
      const result = await dbabs.getPost('11f3b99f');
      assert.notEqual(result, undefined);
    });

    it('Should return the expected content for the row 11f3b99f', async () => {
      const result = await dbabs.getPost('11f3b99f');
      assert.deepEqual(result, {
        post_id: '11f3b99f',
        keyword_id: '986fcdbe',
        board_id: 'bf35c787',
        post_title: 'stems till wore stretch',
        post_content: 'exclaimed scene ice game also closer became law damage hold mail hour care give definition spread bent step walk modern mad whole beautiful your tank sense cold picture listen hunt phrase construction grade direction shaking fastened summer chair purpose birds herd safety discover toward folks nature talk truck',
        post_likes: 10,
        user_id: 'acc45ba4',
        created_date: new Date('2020-02-02T00:00:00.000Z'),
        edited_date: new Date('2020-02-06T00:00:00.000Z'),
      });
    });

    it('Should return undefined if the post does not exist', async () => {
      const result = await dbabs.getPost('DOESNOTE');
      assert.equal(result, undefined);
    });
  });

  // describe('incrising_Post_Views', function() {
  //   it('Should incrise the view by 1', async function() {
  //     let result = await dbabs.incrisin_Post_Views('11f3b99f');
  //     assert.deepEqual(result, {
  //       post_id : '11f3b99f',
  //       views : 1
  //     })
  //   })
  // })

  describe('createPost', () => {
    let postid;

    it('Should return 2 IDs when provided with information', async () => {
      const result = await dbabs.createPost('title', 'content', ['1', '1', '1', '1', '1'], 'df3a26cf', 'bf35c787');
      assert.ok(result.keyword_id !== undefined && result.post_id !== undefined);
      postid = result.post_id;
    });

    it('Should return correct information when the post is searched for', async () => {
      const result = await dbabs.getPost(postid);
      assert.equal(result.post_content, 'content');
    });
  });

  describe('createComment', () => {
    let commentid;

    it('Should return the expected id and content', async () => {
      const result = await dbabs.createComment('this is test content for testing the createComment function','100bad41', '7c367dd6');
      assert.ok(result.comment_content !== undefined && result.comment_id !== undefined);
      commentid = result.comment_id;
      });

    it('Should return correct information when comment is searched for', async() => {
      const result = await dbabs.getComment(commentid);
      assert.equal(result.comment_content, 'this is test content for testing the createComment function');
    });
  });
});

describe('Maintenance Module', () => {
  describe('Cold Start Procedure', () => {
    it('Should not throw any errors', async () => {
      assert.doesNotThrow(mm.coldStart, Error, 'Error Thrown');
    });
  });
});
