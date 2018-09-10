const PhilosopherService = require('services/PhilosopherService');

const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/philosopher', (req, res) => {
        PhilosopherService.create(req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('failed to create philosopher: ' + req.body.name));
    });

    app.patch('/philosopher/:id', (req, res) => {
        Logger.log('info', `To be changed: ${req.body}`);
        PhilosopherService.patch(req.params.id, req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`failed to change update description of the philosopher with ID: ${req.params.id}`));
    });

    app.get('/philosopher', (req, res) => {
        PhilosopherService.getAll()
            .then((response) => res.status(200).send(response));
    });

    app.get('/philosoher/:id', (req, res) => {
        PhilosopherService.getById(req.params.id)
            .then((response) => res.status(200).send(response));
        }
    );

    app.get('philosopher/:name', (req, res) => {
            PhilosopherService.getByName(req.params.name)
                .then((response) => res.status(200).send(response));
        }
    );

    app.get('philosopher/:category', (req, res) => {
        PhilosopherService.getByCategory(req.params.category)
            .then((response) => res.status(200).send(response));
        }
    );

    app.delete('philosopher/:id', (req, res) => {
            PhilosopherService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete philosopher with ID: ${req.params.id}`));
        }
    );
};