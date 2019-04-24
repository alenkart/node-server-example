//index.js
'use strict';

const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const validator = require('express-validator/check');

require('dotenv').config();
require('./lib/models');
const app = express();

//configs
app.use(helmet());
app.use(express.json());

//constrollers
const controllersArgs = { router, validator };
app.use('/user', require('./lib/controllers/user.controller')(controllersArgs));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});