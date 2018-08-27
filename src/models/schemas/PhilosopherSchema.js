const AuditSchema = require('models/schemas/AuditSchema');
const Categories = require('models/schemas/Categories');

const Philosopher = {
    name: {type: String, required: true},
    category: {
        type: [],
        default: 'METAPHYSICS'
        },
    description: {type: String, required: true},
    quotes: {type: [String], default: []} // an array of the id's of the philosopher's quotes
};

module.exports = { ...AuditSchema, ...Philosopher};