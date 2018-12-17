const QuoteService = require('services/QuoteService');

const Quote = require('models/Quote');
const {modelValidator} = require('helpers/ValidationHelper');
const Logger = require('helpers/LoggerHelper');

module.exports = (app) => {

    app.post('/quote', modelValidator(Quote), (req, res) => {
        QuoteService.create(req.body, req.requestor)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('failed to create quote'));
    });

    app.get('/quote', (req, res) => {
        QuoteService.getAll()
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('failed to get all quotes'));
    });

    app.get('/quote/:id', (req, res) => {
            QuoteService.getById(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`Quote with ID: ${req.params.id} does not exist in the database.`));
        }
    );

    app.get('/quote/topic/:topic', (req, res) => {
            QuoteService.getByTopic(req.params.topic)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`No quotes with topic: ${req.params.topic} in the database.`));
        }
    );

    app.get('/quote/philosopher/:name', (req, res) => {
        Logger.log('info', 'This is the GetQuotesByPhilosopherName method');
            QuoteService.getByPhilosopher(req.params.name)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`No quotes for: ${req.params.name} in the database.`));
        }
    );

    app.delete('/quote/:id', (req, res) => {
            QuoteService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete quote with ID: ${req.params.id}`));
        }
    );
};