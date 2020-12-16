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
    getAllUsers: async (req, res) => {
        const users = await findUsers();

        res.status(SUCCESS).json(users);
    },
    authNewUser: async (req, res) => {
        const user = req.body;

        user.password = await hashPassword(user.password);

        const registeredUser = await createUser(user);

        res.status(CREATED).json(registeredUser);
    },

    deleteUser: async (req, res) => {
        const user = await removeUser(req.params.id);

        res.status(SUCCESS).json(user);
    },

    getUserWithCarById: async (req, res) => {
        const { id } = req.params;
        const foundedUser = await findUserById(id);

        res.status(SUCCESS).json(foundedUser);
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const user = req.body;

        user.password = await hashPassword(user.password);

        const result = await updateUser(id, user);

        res.status(SUCCESS).json(result);
    }

};
