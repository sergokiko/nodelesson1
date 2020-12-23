const { UserModel, CarModel } = require('../database/models');

module.exports = {
    findUsers: () => UserModel.findAll(),

    createUser: (user) => UserModel.create(user),

    removeUser: (email) => UserModel.destroy({
        where: { email }
    }),

    findUserByParams: (params) => UserModel.findOne({ where: params }),

    findUserById: (id) => CarModel.findAll({
        where: { users_id: id },
        include: [{ model: UserModel, as: 'user' }]
    }),

    updateUser: (id, user) => UserModel.update(
        user,
        { where: { id } }
    ),

    updateAvatar: (avatar, id) => UserModel.update(
        { avatar },
        { where: { id } }
    )

};
