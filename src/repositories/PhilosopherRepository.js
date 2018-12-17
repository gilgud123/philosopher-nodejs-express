/**
 * Only as an example. Not in use in this app.
 */

const Philosopher = require('models/Philosopher');

const toObject = (obj) => obj.toObject();
const listToObjects = (list) => list.map(toObject);
const getAll = () => Philosopher.find().then(listToObjects);
const getById = (id) => Philosopher.findById(id).then(toObject);
const getByName = (name) => Philosopher.findOne({name: name}).then(toObject);
const getByCategory = (c) => Philosopher.find( {categories: c} ).then(listToObjects);
const create = (rawPhilosopher) => new Philosopher(rawPhilosopher).save().then(toObject);
const remove = (id) => Philosopher.findByIdAndRemove(id);

const update = (id, text) => {
    Philosopher.findOneAndUpdate({_id: id}, {description : text}, {new: true}).then((philosopher) => philosopher.toObject());
};

const patch = (id, text) => Philosopher.findByIdAndUpdate(id, text, {new: true }).then((obj) => obj.toObject());

module.exports = {
    getAll,
    getByCategory,
    getById,
    getByName,
    create,
    remove,
    update,
    patch
};