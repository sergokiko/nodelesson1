const jwt = require('jsonwebtoken');

const { authService, userService: { findUserByParams } } = require('../../sevices');
const { comparePassword } = require('../../helpers');
const { loginValidator } = require('../../validators');

const { BAD_REQUEST } = require('../../config/responce-codes');
const {
    ErrorHandler, errors: {
        NOT_VALID_BODY, NOT_EXIST_IN_BASE, NOT_VALID_TOKEN, NOT_VALID_ID
    }
} = require('../../error');

const { AUTHORIZATION } = require('../../constants/constants');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../config/config');

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

    checkAccessToken: async (res, req, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err) => {
                if (err) {
                    return new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
                }
            });

            const token = await authService.getTokensByParams({ access_token });

            if (!token) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            if (token.user_id !== +res.params.id) {
                throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
            }

            req.userId = token.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            return next(new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code));
        }

        jwt.verify(token, REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                return next(new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code));
            }
        });

        const isTokenExist = await authService.getTokensByParams({ refresh_token: token });

        if (!isTokenExist) {
            return next(new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code));
        }

        if (token.user_id !== +res.params.id) {
            throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
        }

        req.userId = isTokenExist.user_id;

        next();
    }
};
