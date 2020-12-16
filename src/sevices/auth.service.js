const { TokenModel } = require('../database/models');

module.exports = {
    createTokens: (tokens) => TokenModel.create(tokens),

    deleteByParams: (params) => TokenModel.destroy({
        where: params
    }),

    getTokensByParams: (params) => TokenModel.findOne({
        where: params
    })
};
