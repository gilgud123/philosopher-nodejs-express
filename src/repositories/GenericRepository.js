/**
 * Only as an example. Not in use in this app.
 */

const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/jstack-authentication');

const findAll = (model) => (addDeleted = false) => model.find({}).exists('deletedOn', addDeleted).then((list) => list.map((obj) => obj.toObject()));
const findSelected = (model) => (columns, addDeleted = false) => model.find({}).select(columns).then((list) => list.map((obj) => obj.toObject()));
//const getById = (model) => (id) => model.findOne({ '_id': id }).then((obj) => obj.toObject());
const getById = (model) => (id, addDeleted = false) => model.findOne({ '_id': id }).exists('deletedOn', addDeleted).then((obj) => obj.toObject());
const getByProperties = (model) => (where, addDeleted = false) => model.find(where).exists('deletedOn', addDeleted).then((list) => list.map((obj) => obj.toObject()));
const create = (model) => (raw) => new model(raw).save().then((obj) => obj.toObject());
const update = (model) => (id, raw) => model.findOneAndUpdate({ _id: id}, raw, { "new": true });
const patch = (model) => (id, raw) => model.findByIdAndUpdate({ _id: id}, { $set: raw }, { "new": true }).then((obj) => obj.toObject());
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
