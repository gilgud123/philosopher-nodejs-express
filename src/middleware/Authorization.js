const Logger = require('helpers/LoggerHelper');

//
const AuthorizeAdmin = (req, res, next) => {
    if(req.requestor){
        let allow = false;
        if(req.requestor.role === 'admin') allow = true;
        Logger.log('info', `Authorization: is the logged user is an admin? ${allow}`);
        if(allow) next();
        else res.status(403).send({error : 'access denied, you need admin access rights!'});
    }else res.status(400).send({error : 'invalid token'})
};

const AuthorizeAdminOrLoggedInUser = (req, res, next) => {
    let allow = false;

    if (req.requestor.role === 'admin') {
        allow = true;
        Logger.log('info', `Authorization: is the logged in user is an admin? ${allow}`);
    }

    if(req.requestor._id === req.params.id) {
        allow = true;
        Logger.log('info', `Authorization: is this the logged in user? ${allow}`);
    }

    if (allow) next();
    else res.status(403).send({error: 'access denied'});
};

module.exports = { AuthorizeAdmin, AuthorizeAdminOrLoggedInUser };