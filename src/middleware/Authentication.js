const JWT = require('jsonwebtoken');
const ResponseHelper = require('helpers/ResponseHelper');
const Logger = require('helpers/LoggerHelper');

const Authentication = (config) => (req, res, next) => {
    const excluded = [
        '/authentication',
        '/password',
        '/api-'
    ];

    if (excluded.some((url) => req.path.startsWith(url))) next();
    else {
        const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
        JWT.verify(token, process.env.SECRET || Config.secret, (err, user) => {
            if (err) ResponseHelper.unauthorized(req, res);
            else {
                req.requestor = R.clone(user);
                Logger.log('info', `Authentication: the logged in user is : ${req.requestor._id}`);
                next();
            }
        });
    }
};

module.exports = Authentication;