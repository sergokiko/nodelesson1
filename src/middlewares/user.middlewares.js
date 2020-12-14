const userService = require('../sevices/user.service');

const { UserValidator, idValidator, updateUserValidator } = require('../validators');
const {
    ErrorHandler,
    errors: {
        NOT_EXIST_IN_BASE,
        ALREADY_EXIST_IN_BASE
    }
} = require('../error');
const { BAD_REQUEST } = require('../config/responce-codes');

module.exports = {
    checkIfIdValid: (req, res, next) => {
        try {
            const { error } = idValidator.validate(req.params.id);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
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

            if (findUser) {
                throw new ErrorHandler(ALREADY_EXIST_IN_BASE.message, ALREADY_EXIST_IN_BASE.code);
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

            if (!findUser) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserCredentialsValidity: (req, res, next) => {
        try {
            const { error } = UserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    
    checkUpdateDataValidity: (req, res, next) => {
        try {
            const { error } = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
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
