const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/philosopher-node-express');

const toObject = (obj) => obj.toObject();
const listToObjects = (list) => list.map(toObject);

const findAll = (model) => (addDeleted = false) => model.find({}).exists('deletedOn', addDeleted).then(listToObjects);
const findSelected = (model) => (columns, addDeleted = false) => model.find({}).select(columns).then(listToObjects);

//const getById = (model) => (id) => model.findOne({ '_id': id }).then((obj) => obj.toObject());
const getById = (model) => (id, addDeleted = false) => model.findOne({ '_id': id }).exists('deletedOn', addDeleted).then(toObject);
const getByProperties = (model) => (where, addDeleted = false) => model.find(where).exists('deletedOn', addDeleted).then(listToObjects);

const create = (model) => (raw) => new model(raw).save().then(toObject);
const update = (model) => (id, raw) => model.findOneAndUpdate({ _id: id}, { $set: raw }, { "new": true }).then(toObject);
const patch = (model) => (id, raw) => model.findByIdAndUpdate({ _id: id}, { $set: raw }, { "new": true }).then(toObject);

// an item can by only removed by an admin (hardRemove method)
const remove = (model) => (id, by) => model.findOneAndUpdate({ _id: id }, { $set: { deletedOn: new Date(), deletedBy: by }}, { "new": true });
const hardRemove = (model) => (id) => model.find({ '_id': id }).remove();

module.exports = (model) => {
    return {
        findAll: findAll(model),
        findSelected: findSelected(model),
        create: create(model),
        getById: getById(model),
        getByProperties: getByProperties(model),
        update: update(model),
        patch: patch(model),
        remove: remove(model),
        hardRemove: hardRemove(model)
    }
};
