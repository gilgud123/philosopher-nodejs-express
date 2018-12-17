const TopicService = require('services/TopicService');

const {
    AuthorizeAdmin,
    AuthorizeAdminOrLoggedInUser
        } = require('middleware/Authorization');

const Topic = require('models/Topic');
const {modelValidator} = require('helpers/ValidationHelper');
const ResponseHelper = require('helpers/ResponseHelper');

module.exports = (app) => {

    app.post('/topic', modelValidator(Topic), AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.create(req.body, req.requestor));
    });

    app.put('/topic/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.update(req.params.id, req.body, req.requestor));
    });

    app.get('/topic', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.getAll());
    });

    app.get('/topic/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.getById(req.params.id));
    });

    app.get('/topic/name/:name', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.getByName(req.params.name));
    });

    app.delete('/topic/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.remove(req.params.id));
    });

    app.delete('/topic/:id/hardremove', AuthorizeAdmin, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, TopicService.hardRemove(req.params.id));
    });

};