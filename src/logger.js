const {createLogger, format, transports} = require("winston");
const {combine, timestamp, printf, colorize, errors} = format;

const myFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    transports: [
        new transports.Console({
                level: "verbose",
                format: combine(
                    colorize(),
                    timestamp({
                        format: "ddd DD-MM-YYYY HH:mm:ss"
                    }),
                    errors({stack: true}),
                    myFormat
                ),
            }
        ),
        new transports.File({
            level: 'verbose',
            filename: 'logs/error.log',
            format: combine(timestamp(), format.simple())
        })
    ]
});

module.exports = logger;