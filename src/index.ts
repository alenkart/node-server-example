// index

import helmet from "helmet";
import passport from 'passport';
import express, { Router } from "express";

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
app.set('json spaces', 2);
app.use('/public', express.static('public'));

// //constrollers
const router = Router();
router.use('/user', userController);
router.use('/auth', authController);
app.use(`/${process.env.API_VERSION}`, router);
errorHandler(app);

app.listen(process.env.PORT, () => {
    logger.info(`================================================`);
    logger.info(`Server is running...`);
    logger.info(`Environment: ${process.env.NODE_ENV}`);
    logger.info(`Port: ${process.env.PORT}`);
    logger.info(`Api Version: ${process.env.API_VERSION}`);
});