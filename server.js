const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const router = require('./routes/api/users');

// Always require and config near the top
require('dotenv').config();
// connect to the database (after the dotenv)
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify the token and assign 
// a user object to the request object 
app.use(require('./config/checkToken'))

//API routes here
app.use('/api/users', require('./routes/api/users'));
app.use('/api/pedals', require('./routes/api/pedals'));

// 'Catch all' route
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
})