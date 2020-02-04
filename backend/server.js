/// Created 04/02/2020
/// Server file for the backend, open a HTTP Server and serves the static content (for now)


const express = require('express');
const app = express();

// Serve all of the static content for the front end
app.use(express.static('../frontend/'));



// Catch-all for 404's
app.get('*', (req, res) => {
  res.end('Could not process request');
});