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

const authenticate = (email, password) => {

    return Promise.resolve(UserRepo.getByProperties({ email: email })
    ).then((users) => {

        const user = R.head(users);
        Logger.log('info', `User Service Authenticate: The logged in user ID is: ${user.name}`);

        if (user && user.password === password) {
            const data = R.omit(['password'], user);
            //const role = user.role;
            //data.permissions = R.uniq(roles.reduce((permissions, role) => permissions.concat(application.roles[role] || []), []));

            return JWT.sign(data, process.env.SECRET || Config.secret);
        }

        return null;
    });
};

module.exports = {
    patch,
    getAll,
    getById,
    getByName,
    getByEmail,
    create,
    remove,
    authenticate
};