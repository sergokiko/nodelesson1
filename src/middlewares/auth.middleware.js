const { BAD_REQUEST } = require('../config/responce-codes');
const { ErrorHandler, errors: { NOT_VALID_BODY, NOT_EXIST_IN_BASE } } = require('../error');
const { userService: { findUserByParams } } = require('../sevices');
const { comparePassword } = require('../helpers');
const { loginValidator } = require('../validators');

module.exports = {
    checkIfCredentialsValid: (req, res, next) => {
        try {
            const { error } = loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await findUserByParams({ email });

            if (!user) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }
        } catch (e) {
            next(e);
        }
    },
    checkPasswordHash: async (req, res, next) => {
        try {
            const { password, email } = req.body;

            const user = await findUserByParams({ email });

            const isPasswordRight = await comparePassword(password, user.password);

            if (!isPasswordRight) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
