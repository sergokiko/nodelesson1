const { UserModel } = require('../database/models');
const { CarModel } = require('../database/models');

module.exports = {
    findUsers: () => UserModel.findAll(),

    createUser: (user) => UserModel.create(user),

    removeUser: (email) => UserModel.destroy({
        where: { email }
    }),

    findUserById: (id) => CarModel.findAll({
        where: { users_id: id },
        include: [{ model: UserModel, as: 'user' }]
    }),

    updateUser: (email, user) => UserModel.update(
        user,
        { where: { email } }
    )

};
