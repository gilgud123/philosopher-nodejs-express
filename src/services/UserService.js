const User = require('models/User');
const UserRepo = require('repositories/GenericRepository')(User);
const {resetPasswordMail} = require('helpers/MailConfigMailer');

const JWT = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

const Logger = require('helpers/LoggerHelper');

const create = (user, requestor = {_id: 'REGISTER'}) => {
    user.createdOn = Date.now();
    user.createdBy = requestor._id;

    return UserRepo.create(user);
};

const patch = (id, raw ) => UserRepo.patch(id, raw);

const getAll = () => UserRepo.findAll();

const getById = (id) => UserRepo.getById(id);

const getByName = (name) => UserRepo.getByProperties({name: name});

const getByEmail = (email) => UserRepo.getByProperties({email: email});

const getByToken = (token) => UserRepo.getByProperties({ resetPasswordToken: token});

const remove = (id) => UserRepo.remove(id);

const hardRemove = (id) => UserRepo.hardRemove(id);

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

// Sends an email with a link that loads an html page in the front-end where the user can reset the password
// The front-end reset page is still to be added.
const requestResetPassword = (email) => {
    const resetToken = uuidv1();
    Logger.log('info', `Reset token is: ${resetToken}`);
    return getByEmail(email)
        .then(user => {
            Logger.log('info', "This is the requestResetPassword method\nUser ID: " + user._id + "\nEmail: " + email);
            if (user) {
                return UserRepo.patch(user._id, { resetPasswordToken: resetToken })
                    .then(user => {
                        return resetPasswordMail(user, resetToken);
                    })}
            return 'Email address not in use';
        })
};

// This method is invoked by clicking the reset button in the front-end app.
// Sends back 3 items in the req.body: password, user id and the verification token.
// Password verification is done here by the front-end app.
const resetPassword = (password, id, token) => {
    Logger.log('info', "This is the resetPassword method for token:  " + token);
    return getByToken(token)
        .then(user => {
            //const user = R.head(users);
            if(user){
                Logger.log('info', `The user password is: ${password}, the user id is: ${user._id}`);
                return UserRepo.patch(user._id, {password: password, resetPasswordToken: ""});
            }
            return "No user matching this token exists!"
        });
};

module.exports = {
    patch,
    getAll,
    getById,
    getByName,
    create,
    remove,
    hardRemove,
    authenticate,
    requestResetPassword,
    resetPassword
};