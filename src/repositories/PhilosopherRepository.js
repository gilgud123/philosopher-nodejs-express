const Philosopher = require('models/Philosopher');

const toObject = (obj) => obj.toObject();
const listToObjects = (list) => list.map(toObject);
const getAll = () => Philosopher.find().then(listToObjects);
const getById = (id) => Philosopher.findById(id).then(toObject);
const getByName = (name) => Philosopher.find(name).then(toObject);
const getByCategory = (c) => Philosopher.find( {categories: c} ).then(listToObjects);
const create = (rawPhilosopher) => new Philosopher(rawPhilosopher).save().then(toObject);
const remove = (id) => Philosopher.findByIdAndRemove(id);
const update = (id, text) => Philosopher.findOneAndUpdate(id, { description : text }).then((philosopher) => philosopher.toObject());

module.exports = {
    getAll,
    getByCategory,
    getById,
    getByName,
    create,
    remove,
    update
};