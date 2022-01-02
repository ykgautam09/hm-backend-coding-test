const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, errors } = format;

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: 'verbose',
    format: combine(
        colorize(),
        timestamp({
            format: "ddd DD-MM-YYYY HH:mm:ss"
        }), errors({ stack: true }),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()]
});

module.exports = logger;