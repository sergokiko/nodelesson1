const { SUCCESS, NO_CONTENT } = require('../config/responce-codes');
const { tokenizer } = require('../helpers');
const { authService } = require('../sevices');
const { AUTHORIZATION } = require('../constants/constants');

module.exports = {
    loginUser: async (req, res) => {
        const user = req.body;
        const token_pair = tokenizer();

        delete user.password;

        await authService.createTokens({ ...token_pair, user_id: user.id });

        res.status(SUCCESS).json(token_pair);
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.header(AUTHORIZATION);

            await authService.deleteByParams({ access_token });

            res.send(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res) => {
        const refresh_token = req.get(AUTHORIZATION);

        await authService.deleteByParams({ refresh_token });

        const token_pair = tokenizer();
        await authService.createTokens({ ...token_pair, user_id: req.userId });

        res.json(token_pair);
    }
};
