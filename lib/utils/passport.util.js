'use strict';
//passport.uti.js

const User = require('./../models').User;
const passport = require('passport');

//jwt
require('./passport-jwt.util')({ passport, User });

module.exports = passport;