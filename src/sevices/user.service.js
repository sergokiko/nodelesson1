const { UserModel, CarModel } = require('../database/models');

module.exports = {
    findUsers: () => UserModel.findAll(),

    createUser: (user, transaction) => UserModel.create(user, { transaction }),

    removeUser: (email) => UserModel.destroy({
        where: { email }
    }),

    findUserByParams: (params) => UserModel.findOne({ where: params }),

    findUserById: (id) => CarModel.findAll({
        where: { users_id: id },
        include: [{ model: UserModel, as: 'user' }]
    }),

    updateUser: (id, user, transaction) => UserModel.update(
        user,
        {
            where: { id },
            returning: true,
            plain: true,
            transaction
        },
    ),

    updateAvatar: (avatar, id) => UserModel.update(
        { avatar },
        { where: { id } }
    )

};
