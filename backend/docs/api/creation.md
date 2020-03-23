# UoP Forum Dictionary - Creation

There are 2 methods inside of the creation endpoint (/forum/create)
  1. Creating a comment (/forum/create?type=comment)
  2. Creating a post    (/forum/create?type=post)

**Since this feature is behind the /forum extension authentication is required**

Creating a comment
endpoint: /forum/create?type=comment
Takes informarion from the POST body and uses it to make the comment on the DB
Expects data in the format:
``` JSON
{
  content : ?,
  postid : ?,
  replyid : ? (Optional)
}
```

Creating a Post
endpoint: /forum/create?type=post
Takes information from the POST body and uses it to make the post on the DB
Expects data in the format
``` JSON
{
  title : ?,
  body : ?,
  keywords : [
    ?,
    ?,
    ?,
    ?,
    ?
  ],
}
```