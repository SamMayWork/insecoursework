// Created on 11/02/2020
//
// This is the module that is responsible for all of the actions related to
// the post management system (PMS) inside of the system architecture

const logging = require('./logging');
const dbabs = require('./dbabstraction');

// ////////////////////////////////////////////////////////////// POSTS

/**
 * Function to get a given post and return it to the user
 * @param {request} req The Request from the user 
 * @param {response} res The Response to the user
 */
async function retrievePost (req, res) { 
  const threadid = req.query.thread;
  const postResult = await dbabs.getPost(threadid);
  const commentsResult = await dbabs.getComments(threadid);
  res.json(await generateRetrievePostContent(postResult, commentsResult));
  res.end();
}

/**
 * Takes the result of 2 DB queries and formats them into a single JSON object
 * @param {object} post The Post to be formatted 
 * @param {object} comments The Comments to be formatted
 */
function generateRetrievePostContent (post, comments)  {
  const info =  {
    post_information : {
      id : post.rows[0].post_id,
      title : post.rows[0].post_title,
      content : post.rows[0].post_content,
      likes : post.rows[0].post_likes,
      author : post.rows[0].user_id
    },

    comments_information : [

    ]
  };

  // Iterate through all of the comments and append their information as objects
  for (let row of comments.rows) {
    info.comments_information.push({
      id : row.comment_id,
      content : row.comment_content,
      likes : row.comment_likes,
      author : row.user_id,
      repliesto : row.reply_id
    });
  }

  return info;
}

module.exports.retrievePost = retrievePost;