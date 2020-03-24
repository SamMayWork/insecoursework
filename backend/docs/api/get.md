# UoP Forum Dictionary - Getting

There are 4 methods inside of this API endpoint, all of them are children of the /get extension
  1. Getting a Post              (/get?postid=**[param]**)
  2. Getting a Board             (/get?boardid=**[param]**)
  3. Getting a Comment           (/get?commentid=**[param]**)
  4. Getting all of the boards   (/get?all=1)

(As of the build this documentation is included in, all of this functionality works)

Getting a post (Gets all of the content related to a post along with its comments)
endpoint: /get?postid=**[param]**
  - Expects a valid PostID as a parameter, if this is incorrect it will 404
  - All of the user id's have been replaced by the display names of the user that made them
  - Returns the content in the format
``` JSON
  {
    post_information : {
      id : ?
      title : ?
      content : ?
      likes : ?
      user : ?
    },
    comments_information : [
      {
        id : ?
        content : ?
        likes : ?
        user : ?
        repliesto : ?
      }
    ]
  }
```

Getting a board and all of its posts
endpoint: /get?boardid=**[param]**
  - Returns all of the posts inside of the board
  - Returns the content in the format
``` JSON
[
  {post},
  {post}
]
```

Getting a comment and all of its information
endpoint: /get?commentid=**[param]**
  - This does not get the children of the comment, it just gets the comment
  - Returns content in the format 
``` JSON
{
  [{"comment_id":"9bff5267","comment_content":"bad replace larger dropped experiment smallest south dirty solar worry island cent son free fear income satellites shirt worth beauty poem tide couple porch","comment_likes":0,"user_id":"come","post_id":"11f3b99f","reply_id":"0d0fd1b5"}]
}
```

Getting all of the boards off of the server
endpoint: /get?all=1
  - Returns all of the boards inside of the database
  - Returns content in the format
``` JSON
[{"board_id":"bf35c787","board_module":"Introduction to Hong Kong SAR China","board_year":"2020/2021"},{"board_id":"cfd5636c","board_module":"Introduction to Sierra Leone","board_year":"2020/2021"}]
```