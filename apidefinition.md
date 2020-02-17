# API Definition

## Posts/Threads

*POST* Creating a post
``` /forum/create?type=post ```
Creates a post using the information inside of the POST body

*POST* Create a comment
``` /forum/create?type=comment ```
Creates a comment using the information inside of the POST body

*POST* Edit a post
``` /forum/edit?type=post ```
Information & Authorisation inside of the POST body

*POST* Edit a comment
``` /forum/edit?type=comment ```
Information & Authorisation inside of the POST body


## Deletion

*POST* Delete a post
``` /forum/delete?type=post ```
Authorisation inside of the POST body

*POST* Delete a comment
``` /forum/delete?type=comment ```
Authorisation inside of the POST body

*POST* Delete

## Viewing Content

*GET* Get a Post
``` /forum/get?postid=[param] ```
Gets a post from the backend with the associated ID

*GET* Get a Board
``` /forum/get?boardid=[param] ```
Gets a collection of threads from the backend


## Authorisation

*POST* Get Authorisation Token
``` /forum/uac?token=[param] ```
Accepts a user token to provide authorisarion services
