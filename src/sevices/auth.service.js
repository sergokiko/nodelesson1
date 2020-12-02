const { setIsLogged } = require('../varialables/auth.enum');
const { currentUserHandler } = require('../varialables/currentUser');

module.exports = {
    setLogged: (status) => {
        setIsLogged(status);
    },
    setCurrentUserEmail: (email) => {
        currentUserHandler(email);
    }
};
