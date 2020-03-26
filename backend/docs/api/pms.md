# UoP Forum Dictionary - Post Management System

There are a few methods inside of this endpoint /forum/
  - Deleting a post /forum/delete?postid=[param]
  - Deleting a comment /forum/delete?commentid=[param]

Deleting a Post
endpoint is: /forum/delete?postid=[param]
The user calling this function must be the original creator of the post
This is a GET Request so no addtional information need be sent, no response

Deleting a Comment
endpoint is: /forum/delete?commentid=[param]
The user calling this function must be the original creator of the comment
This is a GET Request so no addtional information need be sent, no response
Since it is possible for a comment to be part of a reply chain, the comment is not removed but it is anonymised