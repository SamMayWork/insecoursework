/**
 * Attempts to get the title and content of a note using its ID
 * @param {String} id The ID of the note to find in the database
 * @param {*} sql An SQLConnection to pull the information from
 */
async function getNote(id, sql) {
  console.log(Request for ${id});
  const query = 'SELECT * FROM displaynotes WHERE note_id = $1';
  const results = await sql.query(query, [id]);
  return {
    id: results.rows[0].note_id,
    title: results.rows[0].note_title,
    content: results.rows[0].note_content,
  };
}


function getPost (postid, sql) {
    console.log(Request for ${postid});
    const query = 'select * from Posts WHERE post_id = postid;';
    const results = await sql.query(query, [postid]);
    return {
        id: results.rows[0].post_id,
        title: results.rows[0].post_title,
        content: results.rows[0].post_content,
        likes: results.rows[0].post_likes,
        userid: results.rows[0].user_id,
    };
}

/**
 * 
 * @param {bool} like 
 */
try{  async function ratePost (postid, like) {
    let query;
    const results = await sql.query(query, [postid]);
    if(like == true){
      query = `update Posts set post_likes = post_likes + 1 where post_id = ${postid};`
    }
    else{
      query = `update Posts set post_likes = post_likes - 1 where post_id = ${postid};`
    };
    return true;
  }
} catch(error) {
  logging.errorMessage(error);
  return false;
}