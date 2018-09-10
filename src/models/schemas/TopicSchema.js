const AuditSchema = require('models/schemas/AuditSchema');

const Topic = {
    text : {type: String, required: true}
};

module.exports = { ...AuditSchema, ...Topic};