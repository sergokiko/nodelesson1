let { users } = require('../database');

module.exports = {
    findUsers: () => users,

    createUser: (user) => {
        users.push(user);
        return users;
    },

    removeUser: (email) => {
        users = users.filter((user) => user.email !== email);
        return users;
    },
    findUser: (email) => users.find((user) => user.email === email)
};
