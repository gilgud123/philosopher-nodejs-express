const UserRepo = require('repositories/UserRepository');

const create = (user, requestor = {_id: 'REGISTER'}) => {
    user.createdOn = Date.now();
    user.createdBy = requestor._id;

    return UserRepo.create(user);
};

const patch = (id, raw ) => UserRepo.patch(id, raw);

const getAll = () => UserRepo.getAll();

const getById = (id) => UserRepo.getById(id);

const getByName = (name) => UserRepo.getByProperty({name: name});

const getByEmail = (email) => UserRepo.getByProperty({email: email});

const remove = (id) => UserRepo.remove(id);

module.exports = {
    patch,
    getAll,
    getById,
    getByName,
    getByEmail,
    create,
    remove
};