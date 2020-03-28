const assert = require('assert');
const dbabs = require('../dbabstraction');
const pms = require('../postmodule');

describe('PMS Module DB Tests', () => {

  describe('deletePost', () => {
    it('Should delete the post properly', async () => {
      await dbabs.deletePost('fe5b5840');
      assert.equal(await dbabs.getPost('fe5b5840'), undefined);
    });
  });

  //#region Getting Content
  describe('getPost', () => {
    it('Should not return undefined for row for ID ba5524ac', async () => {
      const result = await dbabs.getPost('ba5524ac');
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
        post_views : 0,
        created_date: new Date('2020-02-02T00:00:00.000Z'),
        edited_date: new Date('2020-02-06T00:00:00.000Z'),
        reported : false
      });
    });

    it('Should return undefined if the post does not exist', async () => {
      const result = await dbabs.getPost('DOESNOTE');
      assert.equal(result, undefined);
    });
  });

  describe('getBoard', () => {
    it('Should not return undefined for the board bf35c787', async () => {
      const results = await dbabs.getBoard('bf35c787');
      assert.notEqual(results, undefined);
    });

    it('Should return 6 rows for the board bf35c787', async () => {
      const results = await dbabs.getBoard('bf35c787');
      assert.equal(results.length, 6);
    });
  });
 
  describe('getPostByDate', () => {
    it('Should return all rows/posts from a board, in ascending date order', async() => {
      const results = await dbabs.getPostByDate('bf35c787');
      assert.equal(results.length, 6);
    });
  });
 //#endregion

  describe('searchPosts', () => {
    it('Should not return undefined for post_title drawn tube heat bean', async () => {
      const result = await dbabs.searchPosts('drawn tube heat bean');
      assert.notEqual(result, undefined);
    });

    it('Should return the expected content for the post_title drawn tube heat bean', async () => {
      const result = await dbabs.searchPosts('drawn tube heat bean');
      assert.deepEqual(result[0], {
        post_id: 'ad7e89d1',
        keyword_id: '2f64b1d3',
        board_id: 'cfd5636c',
        post_title: 'drawn tube heat bean',
        post_content: 'classroom political history gradually exercise log introduced goes brought over art hollow won rabbit worker respect affect difference package greater first pilot be stems explore first these loud waste let recently slave hill war bone plant his care storm bend attached try forest army library manner happened half',
        post_likes: 53,
        post_views : 0,
        user_id: 'acc45ba4',
        created_date: new Date('2020-02-21T00:00:00.000Z'),
        edited_date: new Date('2020-02-07T00:00:00.000Z'),
        reported : false
      });
    });

    it('Should return undefined if the post does not exist', async () => {
      const result = await dbabs.searchPosts('DOESNOTE');
      assert.equal(result[0], undefined);
    });
  });

  

  // //////////////////////////////////////////////////////////// GET ALL BOARDS

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
  });

  // //////////////////////////////////////////////////////////// GENERATE ID

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

  // //////////////////////////////////////////////////////////// GET POST

  

  // //////////////////////////////////////////////////////////// GET COMMENTS

  describe('getComments', () => {
    it('Should not return undefined for row for ID ad7e89d1', async () => {
      const result = await dbabs.getComments('ad7e89d1');
      assert.notEqual(result, undefined);
    });

    it('Should return the expected content for the row ad7e89d1', async () => {
      const result = await dbabs.getComments('ad7e89d1');
      assert.deepEqual(result[0], {
        comment_id: 'q1f3b99f',
        comment_content: 'Sight house has sex never. No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case.',
        comment_likes: 0,
        comment_views : 0,
        user_id: '75b6d7e5',
        post_id: 'ad7e89d1',
        reply_id: null,
        reported : false,
        correct : false
      });
    });

    it('Should return an empty array if the post does not exist', async () => {
      const result = await dbabs.getComments('DOESNOTE');
      assert.deepEqual(result, []);
    });
  });

  // //////////////////////////////////////////////////////////// GET COMMENT

  describe('getComment', () => {
    it('Should not return undefined for row for ID q1f3b99f', async () => {
      const result = await dbabs.getComment('q1f3b99f');
      assert.notEqual(result, undefined);
    });

    it('Should return the expected content for the row q1f3b99f', async () => {
      const result = await dbabs.getComment('q1f3b99f');
      assert.deepEqual(result, {
        comment_id: 'q1f3b99f',
        comment_content: 'Sight house has sex never. No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case.',
        comment_likes: 0,
        comment_views : 0,
        user_id: '75b6d7e5',
        post_id: 'ad7e89d1',
        reply_id: undefined,
        reported : false,
        correct : false
      });
    });

    it('Should return undefined if the post does not exist', async () => {
      const result = await dbabs.getComment('DOESNOTE');
      assert.equal(result, undefined);
    });
  });


  // //////////////////////////////////////////////////////////// CREATE POST

  // //////////////////////////////////////////////////////////// CREATE POST

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

  // //////////////////////////////////////////////////////////// CREATE COMMENT

  describe('createComment', () => {
    let commentid;

    it('Should return the expected id and content', async () => {
      const result = await dbabs.createComment('this is test content for testing the createComment function', '100bad41', '7c367dd6');
      assert.ok(result.comment_content !== undefined && result.comment_id !== undefined);
      commentid = result.comment_id;
    });

    it('Should return correct information when comment is searched for', async () => {
      const result = await dbabs.getComment(commentid);
      assert.equal(result.comment_content, 'this is test content for testing the createComment function');
    });
  });

  // //////////////////////////////////////////////////////////// CREATE BOARD

  describe('createBoard', () => {
    let boardid;
    it('Should return the expected id and module name', async () => {
      const result = await dbabs.createBoard('Introduction to the creation of boards', '2021/2022');
      assert.ok(result.board_name !== undefined && result.board_id !== undefined);
      boardid = result.board_id;
    });

    it('Should return all board information created in first test', async () => {
      const result = await dbabs.executeRawQuerySync(`SELECT * FROM Board WHERE board_id='${boardid}';` );
      assert.deepEqual(result.rows[0], {
        board_id: boardid,
        board_module: 'Introduction to the creation of boards',
        board_year: '2021/2022',
      });
    });
  });

  // //////////////////////////////////////////////////////////// CREATE USER
});

describe('Post Module Testing', () => {
  describe('getPost', () => {
    it('Should not throw and error for a post that does not exist', async () => {
      const req = {
        user: {
          emails: [
            { value: 'umoaksond@msu.edu' },
          ],
        },
        query : {
          postid : 'DOESNOTE'
        }
      };

      const res = {
        jsonresponse : 0,
        status(value) {},
        end() {},
        json (content) { this.jsonresponse = content }
      }

      assert.doesNotThrow(() => { pms.getPost(req, res); });
    });

    it('Should not return undefined when searching for post 11f3b99f', async () => {
      const req = {
        user: {
          emails: [
            { value: 'umoaksond@msu.edu' },
          ],
        },
        query : {
          postid : '11f3b99f'
        }
      };

      const res = {
        jsonresponse : 0,
        status(value) {},
        end() {},
        json (content) { this.jsonresponse = content }
      }
     
      await pms.getPost(req, res);
      assert.notEqual(res.jsonresponse, undefined);
    });

    it('Should return the correct post information for the post 11f3b99f', async () => {
      const req = {
        user: {
          emails: [
            { value: 'umoaksond@msu.edu' },
          ],
        },
        query : {
          postid : '11f3b99f'
        }
      };

      const res = {
        jsonresponse : 0,
        status(value) {},
        end() {},
        json (content) { this.jsonresponse = content }
      }

      await pms.getPost(req, res);
      assert.deepEqual(res.jsonresponse.post, {
        post_id: '11f3b99f',
        keyword_id: '986fcdbe',
        board_id: 'bf35c787',
        post_title: 'stems till wore stretch',
        post_content: 'exclaimed scene ice game also closer became law damage hold mail hour care give definition spread bent step walk modern mad whole beautiful your tank sense cold picture listen hunt phrase construction grade direction shaking fastened summer chair purpose birds herd safety discover toward folks nature talk truck',
        post_likes: 10,
        user_id: 'think',
        post_views : 2,
        created_date: new Date('2020-02-02T00:00:00.000Z'),
        edited_date: new Date('2020-02-06T00:00:00.000Z'),
        reported : false
      });
    });
  });

  describe('ratePost', () => {
    it('Should increase the likes of a post by 1 for the row 81e46a20', async () => {
      await dbabs.ratePost('81e46a20', true);
      const content = await dbabs.getPost('81e46a20');
      assert.equal(content.post_likes, 1);
    });

    it('Should not crash when the row does not exist', async () => {
      assert.doesNotThrow(async () => { await dbabs.ratePost('DOESNOTE', true); });
    });

    it('Should decrease the likes of a post by 1 for the row 81e46a20', async () => {
      await dbabs.ratePost('81e46a20', false);
      const content = await dbabs.getPost('81e46a20');
      assert.equal(content.post_likes, 0);
    });
  });

  describe('rateComment', () => {
    it('Should increase the likes of a comment by 1 for the row c1dbe80b', async () => {
      await dbabs.rateComment('c1dbe80b', true);
      const content = await dbabs.getComment('c1dbe80b');
      assert.equal(content.comment_likes, 1);
    });

    it('Should not crash when the row does not exist', async () => {
      assert.doesNotThrow(async () => { await dbabs.rateComment("DOESNOTE", true); });
    });

    it('Should decrease the likes of a comment by 1 for the row c1dbe80b', async () => {
      await dbabs.rateComment('c1dbe80b', false);
      const content = await dbabs.getComment('c1dbe80b');
      assert.equal(content.comment_likes, 0);
    });
  });
});














