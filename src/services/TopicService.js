const Topic = require('models/Topic');
const TopicRepo = require('repositories/GenericRepository')(Topic);

const create = (topic, requestor) => {
    topic.createdOn = Date.now();
    topic.createdBy = requestor._id;

    return TopicRepo.create(topic);
};

const update = (id, text) => TopicRepo.update(id, text);

const getAll = () => TopicRepo.findAll();

const getById = (id) => TopicRepo.getById(id);

const getByName = (name) => TopicRepo.getByProperties({ text: name });

const remove = (id) => TopicRepo.remove(id);
const hardRemove = (id) => TopicRepo.hardRemove(id);

module.exports = {
    update,
    create,
    getAll,
    getById,
    getByName,
    remove,
    hardRemove
};