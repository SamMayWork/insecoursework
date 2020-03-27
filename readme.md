# INSE Coursework [![Build Status](https://travis-ci.com/SamMayWork/insecoursework.svg?token=XsKSME9i9GNGHYLwzNxW&branch=master)](https://travis-ci.com/SamMayWork/insecoursework)


## Installation

This forum *must* be run on a Linux host with a version of PostgreSQL installed that has a username and password of 'test'

To install and run the latest build of this software
  1. Clone the repo
  2. cd into the repo's root directory
  3. `npm i`
  4. cd into the frontend directory
  5. `npm run build`
  6. Navigate back to the root repository and then run `npm start`

Once the server has been established, the frontend files should be contactable using localhost:8080 in the browser
Backend functionality can also be tested by manually firing GET/POST Requests at localhost:8080

Definition of the API can be found inside of the backend/docs/api and docmentation for all of the backend can be found in backend/docs/out