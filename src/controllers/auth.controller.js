const { SUCCESS } = require('../config/responce-codes');

module.exports = {
    loginUser: (req, res, next) => {
        try {
            const user = req.body;

            delete user.password;

            res.status(SUCCESS).json(user);
        } catch (e) {
            next(e);
        }
    },
};
