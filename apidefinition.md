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

## Viewing Content

*GET* Get a Post
``` /forum/get?postid=[param] ```
Gets a post from the backend with the associated ID

*GET* Get a Board
``` /forum/get?boardid=[param] ```
Gets a collection of threads from the backend

*GET* Get a Comment
``` /forum/get?commentid=[param] ```
Gets a specific comment and all of its children

## UAC (User Account Control)

*POST* Register a User into the system
``` /forum/uac/register ```
Takes a new user and inputs their details into the database

*POST* Delete a user from the system
``` /forum/uac/delete?user=[param]&contentdelete=[param] ```
Deletes a user from the system, requires the ID of the user and whether or not to delete their content

*POST* Change between using the username publicly, or the users real name
``` /forum/uac/name?up=[param] ```
If the value of up is true, the system uses the UP number of the user, if it's false it uses the Real Name of the user

## Notifications

*POST* Turn Notifications globally on or off
``` /forum/notif?global=[param] ```
Turns all notifications on or off