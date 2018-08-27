const QuoteService = require('services/QuoteService');

module.exports = (app) => {

    app.post('/quote', (req, res) => {
        QuoteService.create(req.body)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('failed to create quote'));
    });

    app.get('/quote', (req, res) => {
        QuoteService.getAll()
            .then((response) => res.status(200).send(response));
    });

    app.get('/quote/:id', (req, res) => {
            QuoteService.getById(req.params.id)
                .then((response) => res.status(200).send(response));
        }
    );

    app.get('quote/:topics', (req, res) => {
            QuoteService.getByTopic(req.params.topics)
                .then((response) => res.status(200).send(response));
        }
    );

    app.get('quote/:id', (req, res) => {
            QuoteService.getByPhilosopher(req.params.id)
                .then((response) => res.status(200).send(response));
        }
    );

    app.delete('quote/:id', (req, res) => {
            QuoteService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete quote with ID: ${req.params.id}`));
        }
    );
};