const { SUCCESS } = require('../config/responce-codes');
const { tokenizer } = require('../helpers');
const { authService } = require('../sevices');

module.exports = {
    loginUser: async (req, res) => {
        const user = req.body;
        const token_pair = tokenizer();

        delete user.password;

        await authService.createTokens({ ...token_pair, user_id: user.id });

        res.status(SUCCESS).json(user);
    },
};
