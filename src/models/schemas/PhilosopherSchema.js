const AuditSchema = require('models/schemas/AuditSchema');
const Philosopher = {
    name: {type: String, required: true},
    categories: {
        type: Array,
        default: []
        },
    description: {type: String, required: true}
};

module.exports = { ...AuditSchema, ...Philosopher};