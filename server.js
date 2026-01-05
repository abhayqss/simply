const log = require('./log');
const config = require('./src/config');

const expressApp = require('./app');

// Create and setup the express app.
const app = expressApp();

// Use Env port if present
const port = process.env.PORT || config.port;

const server = app.listen(port, function () {
    log.info("App running on port " + port);
});

server.on("error", function (err) {
    if (err.errno === "EADDRINUSE") {
        log.error('Port ' + port + ' is already in use.');
    } else {
        log.error(err);
    }
    // process.exit(1);
});

process.on('uncaughtException', function (err) {
    if (config.logErrors) {
        // log.error(err.stack);
    }
});
