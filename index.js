//index.js
'use strict';

const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const validator = require('express-validator/check');
const logger = require('./lib/utils/winstom.util');
const morgan = require('./lib/utils/morgan.util')

require('dotenv').config();
require('./lib/models');

const app = express();

//configs
app.use(helmet());
app.use(morgan('combined', logger.stream));
app.use(express.json());


//constrollers
const controllersArgs = {
    logger,
    router,
    validator
};
app.use('/user', require('./lib/controllers/user.controller')(controllersArgs));

app.listen(process.env.PORT, () => {
    logger.info(`Server is running at port: ${process.env.PORT}, environment: ${process.env.NODE_ENV}`);
});