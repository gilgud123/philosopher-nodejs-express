const UserService = require('services/UserService');
const Authorization = require('middleware/Authorization');

const {modelValidator} = require('helpers/ValidationHelper');
const ResponseHelper = require('helpers/ResponseHelper');
const User = require('models/User');
const Logger = require('helpers/LoggerHelper');
const {
    AuthorizeAdmin,
    AuthorizeAdminOrLoggedInUser
            } = require('middleware/Authorization');

module.exports = (app) => {

    app.post('/user', modelValidator(User), AuthorizeAdmin, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, UserService.create(req.body));
    });

    app.patch('/user/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, UserService.patch(req.params.id, req.body));
    });

    app.get('/user', AuthorizeAdmin, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, UserService.getAll());
    });

    app.get('/user/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, UserService.getById(req.params.id));
    });

    app.delete('/user/:id', AuthorizeAdminOrLoggedInUser, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, UserService.remove(req.params.id));
    });

    app.delete('/user/:id/hardremove', AuthorizeAdmin, (req, res) => {
        ResponseHelper.promiseResponseHandler(
            req, res, UserService.hardRemove(req.params.id, req.requestor));
    });

};