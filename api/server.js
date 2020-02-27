const express = require('express');
const session = require('express-session');
const CSK = require('connect-session-knex')(session);
const knex = require('../data/db-config');

const apiRouter = require('./api-router');
const configureMiddleware = require('./configure-middleware');

const server = express();

configureMiddleware(server);

const sessionConfig = {
    name: 'test',
    secret: 'if I tell you, i have to kill you',
    resave: false,
    saveUninitialized: true, // needed for GDPR compliance
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false, // should be true in production
        httpOnly: true // true means JS can't touch the cookie
    },
    store: new CSK({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15
    }),
}

server.use(session(sessionConfig));

server.use('/api', apiRouter);

module.exports = server;