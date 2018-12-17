const DBHelper = require('helpers/DBHelper');
const QuoteSchema = require('models/schemas/QuoteSchema');

module.exports = DBHelper.model('Quote', QuoteSchema);