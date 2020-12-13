const { CREATED } = require('../config/responce-codes');

module.exports = {
    loginUser: (req, res, next) => {
        try {
            const user = req.body;

            delete user.password;

            res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },
};
