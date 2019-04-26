//index.js
'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const validator = require('express-validator/check');
const logger = require('./lib/utils/winstom.util');
const passport = require('./lib/utils/passport.util');

const app = express();

//configs
app.use(helmet());
app.use(morgan('combined', {
    stream: logger.stream
}));
app.use(express.json());
app.use(passport.initialize());


//constrollers
const controllersArgs = {
    validator,
    passport
};
app.use('/user', require('./lib/controllers/user.controller')(controllersArgs));
app.use('/auth', require('./lib/controllers/auth.controller')(controllersArgs));

app.listen(process.env.PORT, () => {
    logger.info(`Server is running at port: ${process.env.PORT}, environment: ${process.env.NODE_ENV}`);
});