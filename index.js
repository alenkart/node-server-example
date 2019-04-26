//index.js
'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const validator = require('express-validator/check');
const passport = require('./lib/utils/passport.util');

require('./lib/utils/mongoose.util');

const app = express();

//configs
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

//constrollers
const controllersArgs = { validator, passport };
app.use('/user', require('./lib/controllers/user.controller')(controllersArgs));
app.use('/auth', require('./lib/controllers/auth.controller')(controllersArgs));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});