const Topic = require('models/Topic');

const toObject = (obj) => obj.toObject();
const listToObjects = (list) => list.map(toObject);
const getAll = () => Topic.find().then(listToObjects);
const getById = (id) => Topic.findById(id).then(toObject);
const getByProperty = (p) => Topic.findOne(p).then(toObject);
const create = (rawTopic) => new Topic(rawTopic).save().then(toObject);
const remove = (id) => Topic.findByIdAndRemove(id);
const update = (id, text) => Topic.findByIdAndUpdate(id, text, {new: true}).then((topic) => topic.toObject());

module.exports = {
    getAll,
    getByProperty,
    getById,
    create,
    remove,
    update
};