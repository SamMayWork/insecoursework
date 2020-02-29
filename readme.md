# INSE Coursework [![Build Status](https://travis-ci.com/SamMayWork/insecoursework.svg?token=XsKSME9i9GNGHYLwzNxW&branch=master)](https://travis-ci.com/SamMayWork/insecoursework)


## Due Date 20/03/2020

INSE Coursework repo, message me if anything is broken and I'll fix it. 

### Starting the server for Unit Testing
1. Getting the server running for testing is currently a _little_ involved, but with some setup it works.
2. Make sure you have Postgres installed on your machine
  1. If you're using Windows you're going to need to install Postgres from the website https://www.postgresql.org/
  2. If you're on Ubuntu run `sudo apt-get install postgres postgres-contrib`
3. Once you've got Postgres installed you're going to need to make a role inside of the database called test with the password "test"
  1. To do this on Linux go to your command line and type `psql`
  2. Once it's loaded up you need to enter `CREATE ROLE test WITH PASSWORD 'test';`
  3. Followed by `ALTER ROLE test Login;`
  4. Followed by `ALTER ROLE test CreateDB;`
  5. Followed by `ALTER ROLE test Superuser;`
4. You then need to run the `backend/dbstructure.sql` file against your Database, have a go at this yourself but if it's not working give me a shout and I'll help you with it.
5. Install NPM packages using `npm i`
6. _Hopefully_, if you run `npm test` it should start your server

### Starting the server for front-end development
1. Clone the repo and make sure you've pulled all of the latest changes
2. Navigate to the backend folder and execute `node server.js --logging --nodb`
3. The server should now be listening on `127.0.0.1:8080` for any requests and will log any incoming requests onto the screen.

### Dependencies for the backend
* pg (PostgreSQL module)
* yargs (Command-line arguments)
* chalk (Command-line highlighting)
* express (HTTP Server)
* bodyParser (Reading HTTP responses)
* simple-google-openid (Authentication)
