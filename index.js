//index.js
'use strict';

const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const expressValidation = require('express-validator/check');

require('dotenv').config();

const app = express();

//configs
app.use(express.json());
app.use(helmet());

//models
require('./lib/utils/mongoose.util')();
const db = {
    user: require('./lib/models/user.model'),
};

//constrollers
const controllersArgs = {router, expressValidation, db};
app.use('/user', require('./lib/controllers/user.controller')(controllersArgs));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});