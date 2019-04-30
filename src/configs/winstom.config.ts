// wistom.config

import { transports, createLogger, format } from 'winston';

const logger = createLogger({
    format: format.simple(),
    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.Console({
            level: 'error',
        }),
        new transports.File({
            level: 'error',
            filename: './logs/error.log'
        })
    ],
});

export default logger;