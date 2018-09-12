const UserService = require('services/UserService');
const Authorization = require('middleware/Authorization');

const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/user', /*Authorization.AuthorizeAdmin,*/ (req, res) => {
        UserService.create(req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('Failed to create user: ' + req.body.name));
    });

    app.patch('/user/:id', /*Authorization.AuthorizeAdminOrLoggedInUser,*/ (req, res) => {
        UserService.patch(req.params.id, req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Failed to change update the user with ID: ${req.params.id}`));
    });

    app.get('/user', /*Authorization.AuthorizeAdmin,*/ (req, res) => {
        UserService.getAll()
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Failed to get the users.`));
    });

    app.get('/user/:id', /*Authorization.AuthorizeAdminOrLoggedInUser, */(req, res) => {
            UserService.getById(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`User with ID: ${req.params.id} does not exist in the database.`));
        }
    );

    app.delete('/user/:id', /*Authorization.AuthorizeAdminOrLoggedInUser,*/ (req, res) => {
            UserService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete user with ID: ${req.params.id}`));
        }
    );
};