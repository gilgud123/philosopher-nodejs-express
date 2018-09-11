const QuoteRepo = require('repositories/QuoteRepository');

const create = (quote, requestor ) => {
    quote.createdOn = Date.now();
    quote.createdBy = requestor._id;

    return QuoteRepo.create(quote);
};

const getAll = () => QuoteRepo.getAll();

const getById = (id) => QuoteRepo.getById(id);

const getByTopic = (topic) => QuoteRepo.getByProperty({ topics: topic });

const getByPhilosopher = (name) => QuoteRepo.getByProperty( {philosopher: name} );

const remove = (id) => QuoteRepo.remove(id);

module.exports = {
    create,
    getAll,
    getById,
    getByPhilosopher,
    getByTopic,
    remove
};