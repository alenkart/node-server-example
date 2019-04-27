//mongoose.util

import mongoose from 'mongoose';
import logger from './winstom.util';

const config = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

mongoose.connect(process.env.MONGO_DB_URL, config);

mongoose.connection.on('error', (error) => {
    logger.error(`Error while connection to the database`);
    logger.error(error);
    process.exit(1);
});

export default mongoose;