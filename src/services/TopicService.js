const TopicRepo = require('repositories/TopicRepository');

const create = (topic) => {
    topic.createdOn = Date.now();
    //topic.createdBy = requestor._id;

    return TopicRepo.create(topic);
};

const update = (id, text) => TopicRepo.update(id, text);

const getAll = () => TopicRepo.getAll();

const getById = (id) => TopicRepo.getById(id);

const getByQuote = (quote) => TopicRepo.getByProperty({ quotes: quote });

const remove = (id) => TopicRepo.remove(id);

module.exports = {
    update,
    create,
    getAll,
    getById,
    getByQuote,
    remove
};