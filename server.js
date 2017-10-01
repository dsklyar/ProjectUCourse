const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// goddamn database connection
mongoose.connect('mongodb://daniel:ucourse@ds044709.mlab.com:44709/ucourse', function(err) {
  if(err) {
    console.log(err);
  } else console.log('Successful connection to db.');
});

// Get our API routes
const apiRoutes = require('./server/routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view-engine', 'ejs');

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', apiRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Listen on provided port, on all network interfaces.
 */
const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));