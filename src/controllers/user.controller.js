const { userService: { findUsers, removeUser, findUserById, createUser, updateUser } } = require('../sevices');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await findUsers();

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await removeUser(req.params.email);

            res.status(200).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserWithCarById: async (req, res) => {
        try {
            const { id } = req.params;
            const foundedUser = await findUserById(id);

            res.status(200).json(foundedUser);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    authNewUser: async (req, res) => {
        try {
            const user = await createUser(req.body);

            res.json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { email } = req.params;
            const user = req.body;
            const result = await updateUser(email, user);

            res.json(result);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }

};
