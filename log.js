const winston = require('winston');
const config = require('./src/config');
const level = config.logLevel || 'info';

const transports = [];

transports.push(new (winston.transports.Console)({ level: level, colorize: true }));

if(config.logFileEnabled){
    transports.push(new (winston.transports.File)({filename: 'app.log', level: level }));
}

module.exports = winston.createLogger({
    exitOnError: false,
    transports: transports
});