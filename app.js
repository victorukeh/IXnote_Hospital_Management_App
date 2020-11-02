const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

// const UserModel = require('./model/model');

//DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
const dotenv = require('dotenv').config()
console.log(dotenv.parsed)

require('./config/keys')()

const routes = require('./routes/api/users');
const secureRoute = require('./routes/api/secure-routes');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});