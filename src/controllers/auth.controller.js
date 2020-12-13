const { SUCCESS } = require('../config/responce-codes');

module.exports = {
    loginUser: (req, res) => {
        const user = req.body;

        delete user.password;

        res.status(SUCCESS).json(user);
    },
};
