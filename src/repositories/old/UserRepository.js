const User = require('models/User');

const toObject = (obj) => obj.toObject();
const listToObjects = (list) => list.map(toObject);
const getAll = () => User.find().then(listToObjects);
const getById = (id) => User.findById(id).then(toObject);
const getByProperty = (raw) => User.findOne(raw).then(toObject);
const create = (rawUser) => new User(rawUser).save().then(toObject);
const remove = (id) => User.findByIdAndRemove(id);

const patch = (id, raw) => User.findByIdAndUpdate(id, raw, {new: true}).then((obj) => obj.toObject());

module.exports = {
    getAll,
    getByProperty,
    getById,
    create,
    remove,
    patch
};