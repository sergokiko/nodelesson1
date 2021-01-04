const { Op } = require('sequelize');
const { TokenModel } = require('../database/models');
const { ONE_MONTH } = require('../constants/constants');

module.exports = {
    createTokens: (tokens) => TokenModel.create(tokens),

    deleteByParams: (params) => TokenModel.destroy({
        where: params
    }),

    getTokensByParams: (params) => TokenModel.findOne({
        where: params
    }),
    removeExpiredRefreshTokens: () => TokenModel.destroy({
        where: {
            created_at: {
                [Op.gt]: new Date(new Date() - ONE_MONTH)
            }
        }
    })
};
