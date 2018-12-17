const Philosopher = require('models/Philosopher');
const PhilosopherRepo = require('repositories/GenericRepository')(Philosopher);

const create = (philosopher, requestor ) => {
    philosopher.createdOn = Date.now();
    philosopher.createdBy = requestor._id;

    return PhilosopherRepo.create(philosopher);
};

const patch = (id, text, requestor ) => {
    philosopher.lastModifiedOn = Date.now();
    philosopher.lastModifiedBy = requestor._id;

    PhilosopherRepo.patch(id, text);
};

const update = (id, text ) => PhilosopherRepo.update(id, text);

const getAll = () => PhilosopherRepo.findAll();

const getById = (id) => PhilosopherRepo.getById(id);

const getByName = (name) => PhilosopherRepo.getByProperties({name: name});

const getByCategory = (category) => PhilosopherRepo.getByProperties({ categories: category } );

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