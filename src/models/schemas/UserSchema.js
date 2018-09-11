const AuditSchema = require('models/schemas/AuditSchema');
const User = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
};

module.exports = { ...AuditSchema, ...User};