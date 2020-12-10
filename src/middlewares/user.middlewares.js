const userService = require('../sevices/user.service');
const { ErrorHandler, errors: { NOT_VALID_BODY, NOT_VALID_ID, NOT_EXIST_IN_BASE } } = require('../error');

module.exports = {
    checkIfIdValid: (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfUserWithThisIdExist: async (req, res, next) => {
        try {
            const { id } = req.body;
            const usersData = await userService.findUsers();

            const foundUser = usersData.find((user) => user.id === id);

            if (foundUser) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfEmailExistInBase: async (req, res, next) => {
        try {
            const { email } = req.params;
            const users = await userService.findUsers();

            const findUser = users.find((user) => user.email === email);

            if (!findUser) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfEmailForDeleteExistInBase: async (req, res, next) => {
        try {
            const { email } = req.params;
            const users = await userService.findUsers();

            const findUser = users.find((user) => user.email === email);

            if (findUser) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserCredentialsValidity: (req, res, next) => {
        try {
            const user = req.body;

            if (!user.email || !user.password) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordValidity: (req, res, next) => {
        try {
            const { password } = req.body;

            if (password.length < 8) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfEmailValid: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfBaseNotEmpty: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

            if (!users.length) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
