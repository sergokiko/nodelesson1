const { userService: { findUsers, removeUser, findUser } } = require('../sevices');
const { currentUserEmail } = require('../varialables/currentUser');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = findUsers();

            res.status(200).render('users', { users, currentUserEmail });
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

};
