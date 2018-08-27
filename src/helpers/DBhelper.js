const Mongoose = require('mongoose');

Mongoose.connect(process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/philosopher-node-express');

module.exports = (name, schemaObject) => {
    const schema = new Mongoose.Schema(schemaObject);
    return Mongoose.model(name, schema);
};