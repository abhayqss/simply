const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const log = require('./log');
const config = require('./src/config');

/**
 * Creates and configures the express app.
 * @returns {exports|*}
 */
module.exports = function () {
    const app = express();

    app.use(`${config.context}`, express.static(path.join(__dirname, 'build')));

    // Express Settings
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: config.httpLimit}));

    // Security Settings
    app.use(cookieParser());

    app.use(session({
        resave: true,
        saveUninitialized: true,
        key: 'sessionId',
        secret: config.session.key
    }));

    // Add No Cache
    app.use(function (req, res, next) {
        res.header('Pragma', "no-cache");
        res.header('Cache-Control', "private, no-cache, must-revalidate, no-store, max-age=0");
        res.header('Expires', "Wed, 13 Apr 2019 18:08:00 GMT");
        res.locals.forceRefresh = (req.headers && req.headers['cache-control'] === 'no-cache');
        next();
    });

    // Add Locals available to the ejs templates and routes
    app.use(function (req, res, next) {
        res.locals.config = config;
        res.locals.escapeJS = function (s) {
            return (typeof s !== 'string') ? s : s.replace(/'/g, '\\x27').replace(/"/g, '\\x22');
        };
        next();
    });

    // error handler.
    app.use(function (err, req, res, next) {
        const status = err.status || 500;

        if (status === 404) {
            log.error("Error 404. The requested resource was not found: " + req.url);
        } else if (status !== 404 || req.url.substr(-11) !== 'favicon.ico') {
            log.error(err.stack);
        }

        // Handle ajax requests.
        if (req.xhr) {
            res.json(status, {error: err.message});
            return;
        }

        res.status(status);
        res.json({
            message: err.message,
            error: err
        });
    });

    app.get(`${config.context}/*`, function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    app.listen(config.port);

    return app;
};
