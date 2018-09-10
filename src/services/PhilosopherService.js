const PhilosopherRepo = require('repositories/PhilosopherRepository');

const create = (philosopher ) => {
    philosopher.createdOn = Date.now();
    //philosopher.createdBy = requestor._id;

    return PhilosopherRepo.create(philosopher);
};

const update = (id, text ) => PhilosopherRepo.update(id, text);

const patch = (id, text ) => PhilosopherRepo.patch(id, text);

const getAll = () => PhilosopherRepo.getAll();

const getById = (id) => PhilosopherRepo.getById(id);

const getByName = (name) => PhilosopherRepo.getByName(name);

const getByCategory = (category) => PhilosopherRepo.getByCategory(category);

const remove = (id) => PhilosopherRepo.remove(id);

module.exports = {
    update,
    patch,
    getAll,
    getById,
    getByName,
    getByCategory,
    create,
    remove
};