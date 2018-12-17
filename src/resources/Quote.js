const QuoteService = require('services/QuoteService');

const {
    AuthorizeAdmin,
    AuthorizeAdminOrLoggedInUser
} = require('middleware/Authorization');

const Quote = require('models/Quote');
const {modelValidator} = require('helpers/ValidationHelper');
const ResponseHelper = require('helpers/ResponseHelper');
const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/quote', modelValidator(Quote), AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.create(req.body, req.requestor));
    });

    app.get('/quote', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.getAll());
    });

    app.get('/quote/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.getById(req.params.id));
    });

    app.get('/quote/topic/:topic', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.getByTopic(req.params.topic));
    });

    app.get('/quote/philosopher/:name', AuthorizeAdminOrLoggedInUser, (req, res) => {
        Logger.log('info', 'This is the GetQuotesByPhilosopherName method');
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.getByPhilosopher(req.params.name));
    });

    app.delete('/quote/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.remove(req.params.id));
    });

    app.delete('/quote/:id/hardremove', AuthorizeAdmin, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, QuoteService.hardRemove(req.params.id));
    });

};