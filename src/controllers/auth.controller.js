const { userService: { createUser } } = require('../sevices');
const { authService: { setLogged, setCurrentUserEmail } } = require('../sevices');

module.exports = {
    loginUser: (req, res) => {
        try {
            setLogged(true);
            setCurrentUserEmail(req.body.email);

            res.status(200).redirect('/users');
        } catch (e) {
            res.json(e.message);
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

    getLoginPage: (req, res) => {
        try {
            res.status(200).render('login');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    authGet: (req, res) => {
        try {
            res.status(200).render('register');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    logout: (req, res) => {
        try {
            setLogged(false);

            res.status(200).redirect('/login');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }

};
