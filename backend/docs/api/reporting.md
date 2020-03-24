# UoP Forum Dictionary - Reporting

There are 2 methods inside of this endpoint:
  1. Reporting a Post        (/forum/report?postid=**[param]**)
  2. Reporting a Comment     (/forum/report?commentid=**[param]**)

(As of the current build all of this functionality works and has been tested)

Reporting a Post
endpoint: /forum/report?postid=**[param]**
Turns the field for reported for the post to true
Reported status can be returned by getting the post

Reporting a Comment
endpoint: /forum/report?commentid=**[param]**
Turns the field for reported for the comment to true
Reported status can be returned by getting the comment