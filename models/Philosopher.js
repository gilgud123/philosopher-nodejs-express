const DBHelper = require('helpers/DBHelper');
const PhilosopherSchema = require('models/schemas/PhilosopherSchema');

module.exports = DBHelper('Philosopher', PhilosopherSchema);