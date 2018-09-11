const UserService = require('services/UserService');

module.exports = (App) => {

    App.post('/authentication/authenticate', (req, res) => {
        UserService.authenticate(req.body.email, req.body.password)
            .then((token) => {
                if (token) res.status(200).send(token);
                else res.status(400).send("Unauthorized!");
            })
            .catch((err) => res.status(400).send(err));
    });
};