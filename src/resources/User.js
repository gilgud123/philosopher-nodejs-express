const UserService = require('services/UserService');

const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/user', (req, res) => {
        UserService.create(req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('Failed to create user: ' + req.body.name));
    });

    app.patch('/user/:id', (req, res) => {
        UserService.patch(req.params.id, req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Failed to change update the user with ID: ${req.params.id}`));
    });

    app.get('/user', (req, res) => {
        UserService.getAll()
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Failed to get the users.`));
    });

    app.get('/user/:id', (req, res) => {
            UserService.getById(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`User with ID: ${req.params.id} does not exist in the database.`));
        }
    );

    app.get('/user/name/:name', (req, res) => {
            UserService.getByName(req.params.name)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`User by name: ${req.params.id} does not exist in the database.`));
        }
    );

    app.get('/user/email/:email', (req, res) => {
            UserService.getByEmail(req.params.email)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`No users with email: ${req.params.email} exist.`));
        }
    );

    app.delete('/user/:id', (req, res) => {
            UserService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete user with ID: ${req.params.id}`));
        }
    );
};