const DBHelper = require('helpers/DBHelper');
const TopicSchema = require('models/schemas/TopicSchema');

module.exports = DBHelper.model('Topic', TopicSchema);