const Quote = require('models/Quote');

const toObject = (obj) => obj.toObject();
const listToObjects = (list) => list.map(toObject);
const getAll = () => Quote.find().then(listToObjects);
const getById = (id) => Quote.findById(id).then(toObject);
const getByProperty = (p) => Quote.find(p).then(listToObjects); // By topic of by philosopher id
const create = (rawQuote) => new Quote(rawQuote).save().then(toObject);
const remove = (id) => Quote.findByIdAndRemove(id);

module.exports = {
    getAll,
    getById,
    getByProperty,
    create,
    remove
};