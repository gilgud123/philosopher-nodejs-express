const DBHelper = require('helpers/DBHelper');
const UserSchema = require('models/schemas/UserSchema');

module.exports = DBHelper.model('User', UserSchema);