const userService = require('../sevices/user.service');

module.exports = {
    checkIfEmailAndPasswordCorrect: (req, res, next) => {
        try {
            const { email, password } = req.body;
            const usersData = userService.findUsers();

            const foundUser = usersData.find((user) => user.password === password && user.email === email);

            if (!foundUser) {
                throw new Error('email or password are wrong');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    checkUserValidity: (req, res, next) => {
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
    checkIfUserExistInBase: (req, res, next) => {
        try {
            const { email } = req.body;
            const usersData = userService.findUsers();

            const foundUser = usersData.find((user) => user.email === email);

            if (foundUser) {
                throw new Error('current user not exist in base');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkPasswordLength: (req, res, next) => {
        try {
            const { password } = req.body;

            if (password.length < 8) {
                throw new Error('Password must be longer than 8 digits');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
