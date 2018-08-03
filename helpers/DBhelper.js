const Mongoose = require('mongoose');

module.exports = (name, schemaObject) => {
    const schema = new Mongoose.Schema(schemaObject);
    return Mongoose.model(name, schema);
};