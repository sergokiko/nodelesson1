const { hashPassword } = require('../helpers');
const {
    userService: {
        findUsers,
        removeUser,
        findUserById,
        createUser,
        updateUser
    }
} = require('../sevices');

const { CREATED, SUCCESS } = require('../config/responce-codes');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await findUsers();

            res.status(SUCCESS).json(users);
        } catch (e) {
            next(e);
        }
    },
    authNewUser: async (req, res, next) => {
        try {
            const user = req.body;
            user.password = await hashPassword(user.password);

            const registeredUser = await createUser(user);

            res.status(CREATED).json(registeredUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const user = await removeUser(req.params.email);

            res.status(SUCCESS).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserWithCarById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const foundedUser = await findUserById(id);

            res.status(SUCCESS).json(foundedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { email } = req.params;
            const user = req.body;

            user.password = await hashPassword(user.password);

            const result = await updateUser(email, user);

            res.status(SUCCESS).json(result);
        } catch (e) {
            next(e);
        }
    }

};
