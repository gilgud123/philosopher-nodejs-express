const Mongoose = require('mongoose');
const model = (name, schemaObject, options = { versionKey: false, minimize: false }, indexes = []) => {
    const schema = new Mongoose.Schema(schemaObject, options);
    indexes.map(index => schema.index(index));
    return Mongoose.model(name, schema);
};

module.exports = { model };