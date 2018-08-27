const Winston = require('winston');
const AppRoot = require('app-root-path');

const Options = {
    file: {
        level: 'info',
        filename: `${AppRoot}/logs/philosopher-quote-app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

    module.exports = Winston.createLogger({
    level: 'info',
    format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new Winston.transports.Console(Options.console),
        new Winston.transports.File(Options.file)
    ],
        exitOnError: false
});
