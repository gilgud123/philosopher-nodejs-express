const Quote = require('models/Quote');
const QuoteRepo = require('repositories/GenericRepository')(Quote);

const create = (quote, requestor ) => {
    quote.createdOn = Date.now();
    quote.createdBy = requestor._id;

    return QuoteRepo.create(quote);
};

const getAll = () => QuoteRepo.findAll();

const getById = (id) => QuoteRepo.getById(id);

const getByTopic = (topic) => QuoteRepo.getByProperties({ topics: topic });

const getByPhilosopher = (name) => QuoteRepo.getByProperties( {philosopher: name} );

const remove = (id) => QuoteRepo.remove(id);

module.exports = {
    create,
    getAll,
    getById,
    getByPhilosopher,
    getByTopic,
    remove
};