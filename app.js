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

//const Authentication = require('middleware/Authentication');
//app.use(Authentication());

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
require('resources/Auth')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * Seed method: uncomment as needed.
 */
const Seed = require('seed/Seed');
const SeedQ = require('seed/SeedQuotes');
//Seed.seedPhilosophers();
//SeedQ.seedQuotes();
//Seed.seedTopics();
//Seed.seedUsers();

/**
 * Swagger documentation setup
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', (req, res, next) => next());

app.listen(process.env.PORT || Config.port, () => Logger.log('info', `Philosopher Quote API started on port ${process.env.PORT || Config.port}`));
