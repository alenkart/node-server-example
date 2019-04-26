const {
    transports,
    createLogger,
    format
} = require('winston');

const logger = createLogger({
    format: format.simple(),
    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.File({
            level: 'error',
            filename: './logs/error.log'
        })
    ],
});

logger.stream = {
    write: (message) => logger.info(message.trim())
}

module.exports = logger;