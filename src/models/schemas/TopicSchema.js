const AuditSchema = require('models/schemas/AuditSchema');

const Topic = {
    text : {type: String, required: true},
    quotes : { type: [String], default: []}, // an array of id's of the assoiciated quotes
};

module.exports = { ...AuditSchema, ...Topic};