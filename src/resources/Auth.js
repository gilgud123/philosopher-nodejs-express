const UserService = require('services/UserService');

module.exports = (App) => {

    App.post('/authentication/authenticate', (req, res) => {
        UserService.authenticate(req.body.email, req.body.password)
            .then((token) => {
                if (token) res.status(200).send(token);
                else res.status(400).send("Unauthorized!");
            })
            .catch((err) => res.status(400).send("Error: " + err));
    });

    App.post('/password/reset/request', (req, res) => {
        UserService.requestResetPassword(req.body.email)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(err + '\nFailed to reset password for user with email: ' + req.body.email));
    });

    App.post('/password/reset', (req, res) => {
        UserService.resetPassword(req.body.password, req.body.id, req.body.token)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('Failed to reset password for user with email: ' + req.body.email));
    });
};