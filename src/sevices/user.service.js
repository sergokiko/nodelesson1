const db = require('../database').getInstance();

module.exports = {
    findUsers: () => {
        const UserModel = db.setModels('User');

        return UserModel.findAll();
    },

    createUser: (user) => {
        const UserModel = db.setModels('User');

        return UserModel.create(user);
    },
    removeUser: (id) => id,
    findUser: (id) => id
};
