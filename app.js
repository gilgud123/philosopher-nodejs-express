require('app-module-path').addPath(`${__dirname}/src`);
process.env.NODE_ENV !== 'production' ? require('dotenv').load() : null;

global.Config = require('./config/local.config.json');
global.R = require('ramda');

const express = require('express');
const path = require('path');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');

const app = express();

const Logger = require('helpers/LoggerHelper');

/**
 * Middleware
 */
const Cors = require('cors');
app.use(Cors());

const Authentication = require('middleware/Authentication');
app.use(Authentication());

const BodyParser = require('body-parser');
app.use(BodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
require('resources/Philosopher')(app);
require('resources/Quote')(app);
require('resources/Topic')(app);
require('resources/User')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

const Seed = require('seed/Seed');
//Seed.seedPhilosophers();
//Seed.seedQuotes();
//Seed.seedTopics();
//Seed.seedUsers();

app.listen(process.env.PORT || Config.port, () => Logger.log('info', `Philosopher Quote API started on port ${process.env.PORT || Config.port}`));
