const AuditSchema = require('models/schemas/AuditSchema');

const Quote = {
    text : { type: String, required: true},
    philosopher : { type: String, required: true}, // the philosopher's id
    topics : { type: [String], default: []} // an array of topics' id's
};

module.exports = { ...AuditSchema, ...Quote };