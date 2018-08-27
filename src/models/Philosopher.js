const DBHelper = require('helpers/DBHelper');
const PhilosopherSchema = require('models/schemas/PhilosopherSchema');
const Categories = require('models/schemas/Categories');

module.exports = DBHelper('Philosopher', PhilosopherSchema);