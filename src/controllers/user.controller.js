const { userService: { findUsers, removeUser, findUser } } = require('../sevices');
const { userService: { createUser } } = require('../sevices');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await findUsers();

            res.status(200).json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            removeUser(req.params.email);

            res.status(200).json('deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            const { email } = req.params;
            const foundedUser = findUser(email);

            res.status(200).json(foundedUser);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    authNewUser: (req, res) => {
        try {
            createUser(req.body);

            res.status(200).redirect('/login');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

};
