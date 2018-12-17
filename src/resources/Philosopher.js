const PhilosopherService = require('services/PhilosopherService');
const {
    AuthorizeAdmin,
    AuthorizeAdminOrLoggedInUser
        } = require('middleware/Authorization');

const Philosopher = require('models/Philosopher');
const {modelValidator} = require('helpers/ValidationHelper');
const ResponseHelper = require('helpers/ResponseHelper');
const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/philosopher', modelValidator(Philosopher), AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.create(req.body, req.requestor));
    });

    app.patch('/philosopher/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.patch(req.params.id, req.body, req.requestor));
    });

    app.get('/philosopher', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.getAll());
    });

    app.get('/philosopher/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.getById(req.params.id));
    });

    app.get('/philosopher/name/:name', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.getByName(req.params.name));
    });

    app.get('/philosopher/category/:category', AuthorizeAdminOrLoggedInUser, (req, res) => {
        Logger.log('info', `Philosopher by category: ${req.params.category}`);
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.getByCategory(req.params.category));
    });

    app.delete('/philosopher/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.remove(req.params.id));
    });

    app.delete('/philosopher/:id/hardremove', AuthorizeAdmin, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, PhilosopherService.hardRemove(req.params.id));
    });
};