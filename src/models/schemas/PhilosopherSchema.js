const AuditSchema = require('models/schemas/AuditSchema');
const Philosopher = {
    name: {
        type: String,
        required: true,
        minLength: 2,
        trim: true},
    categories: {
        type: Array,
        default: []
        },
    description: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    }
};

module.exports = { ...AuditSchema, ...Philosopher};