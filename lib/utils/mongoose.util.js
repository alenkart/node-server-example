//mongoose
'use strict';

const mongoose = require('mongoose');

module.exports = () => {

    const config = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    };

    mongoose.connect(process.env.MONGO_DB_URL, config);

    mongoose.connection.on('error', (error) => {
        console.log(`Error while connection to database ${database}`);
        console.log(error);
        process.exit(1);
    });

    return mongoose;
}