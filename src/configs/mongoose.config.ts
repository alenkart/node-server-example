// mongoose.config

import mongoose from 'mongoose';
import logger from './winstom.config';

const config = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

mongoose.connect(process.env.MONGO_DB_URL, config);

mongoose.connection.on('connected', function() {
    logger.info("Database connection established successfully");
});

mongoose.connection.on('error', (error) => {
    logger.error(`Error while trying to connect to the database`);
    logger.error(error);
    process.exit(1);
});

export default mongoose;