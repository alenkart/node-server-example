//index.js

import helmet from "helmet";
import passport from 'passport';
import express from "express";

import './utils/dotenv.util';
import './utils/mongoose.util';
import logger from './utils/winstom.util';
import morgan from './utils/morgan.util';
import userController from './controllers/user.controller';
import authController from './controllers/auth.controller';

const app = express();

//configs
app.use(helmet());
app.use(morgan);
app.use(express.json());
app.use(passport.initialize());

// //constrollers
app.use('/user', userController);
app.use('/auth', authController);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running at port: ${process.env.PORT}, environment: ${process.env.NODE_ENV}`);
});