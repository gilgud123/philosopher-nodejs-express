const PhilosopherService = require('services/PhilosopherService');
const Authorization = require('middleware/Authorization');

const Philosopher = require('models/Philosopher');
const {modelValidator} = require('helpers/ValidationHelper');
const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/philosopher', modelValidator(Philosopher), (req, res) => {
        PhilosopherService.create(req.body, req.requestor)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('Failed to create philosopher: ' + req.body.name));
    });

    app.patch('/philosopher/:id', (req, res) => {
        PhilosopherService.patch(req.params.id, req.body, req.requestor)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Failed to change update description of the philosopher with ID: ${req.params.id}`));
    });

    app.get('/philosopher', (req, res) => {
        PhilosopherService.getAll()
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Failed to get the philosophers.`));
    });

    app.get('/philosopher/:id', (req, res) => {
        PhilosopherService.getById(req.params.id)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`Philosopher with ID: ${req.params.id} does not exist in the database.`));
        }
    );

    app.get('/philosopher/name/:name', (req, res) => {
            PhilosopherService.getByName(req.params.name)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`Philosopher by name: ${req.params.id} does not exist in the database.`));
        }
    );

    app.get('/philosopher/category/:category', (req, res) => {
        Logger.log('info', `Philosopher by category: ${req.params.category}`);
        PhilosopherService.getByCategory(req.params.category)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`No philosophers exist in category: ${req.params.category}.`));
        }
    );

    app.delete('/philosopher/:id', (req, res) => {
            PhilosopherService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete philosopher with ID: ${req.params.id}`));
        }
    );
};