const userService = require('../sevices/user.service');

module.exports = {
    checkIfIdValid: (req, res, next) => {
        try {
            const { id } = req.body;

            if (!id) {
                throw new Error('id is not valid');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkIfUserWithThisIdExist: async (req, res, next) => {
        try {
            const { id } = req.body;
            const usersData = await userService.findUsers();

            const foundUser = usersData.find((user) => user.id === id);

            if (foundUser) {
                throw new Error('current user not exist in base');
            }

            next();
        } catch (e) {
            res.status(404).json(e.message);
        }
    },

    checkIfEmailExistInBase: async (req, res, next) => {
        try {
            const { email } = req.params;
            const users = await userService.findUsers();

            const findUser = users.find((user) => user.email === email);

            if (!findUser) {
                throw new Error('Email is not found in base');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkIfEmailForDeleteExistInBase: async (req, res, next) => {
        try {
            const { email } = req.params;
            const users = await userService.findUsers();

            const findUser = users.find((user) => user.email === email);

            if (findUser) {
                throw new Error('This User already exist');
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

    checkPasswordValidity: (req, res, next) => {
        try {
            const { password } = req.body;

            if (password.length < 8) {
                throw new Error('Password should contain at least 8 characters');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    checkIfEmailValid: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new Error('id is not valid');
            }

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
