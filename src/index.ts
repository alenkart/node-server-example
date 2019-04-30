// index

import helmet from "helmet";
import passport from 'passport';
import express from "express";

import './configs/dotenv.config';
import './configs/mongoose.config';
import logger from './configs/winstom.config';
import morgan from './configs/morgan.config';
import { userController, authController, errorHandler } from './controllers';

const app = express();

//configs
app.use(helmet());
app.use(morgan);
app.use(express.json());
app.use(passport.initialize());
app.use('/public', express.static('public'));

// //constrollers
app.use('/user', userController);
app.use('/auth', authController);
errorHandler(app);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running at port: ${process.env.PORT}, environment: ${process.env.NODE_ENV}`);
});