const userService = require('../sevices/user.service');

module.exports = {
    checkIfEmailValid: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new Error('Email is not valid');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkIfUserExist: (req, res, next) => {
        try {
            const { email } = req.body;
            const usersData = userService.findUsers();

            const foundUser = usersData.find((user) => user.email === email);

            if (foundUser) {
                throw new Error('current user not exist in base');
            }

            next();
        } catch (e) {
            res.status(404).json(e.message);
        }
    },

    checkIfEmailForDeleteIsValid: (req, res, next) => {
        try {
            const { email } = req.params;
            const users = userService.findUsers();
            const findUser = users.find((user) => user.email === email);

            if (!findUser) {
                throw new Error('Email is not found in base');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    checkUserCredentialsValidity: (req, res, next) => {
        try {
            const user = req.body;

            if (!user.email || !user.password) {
                throw new Error('Email amd password should be not empty');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
};
