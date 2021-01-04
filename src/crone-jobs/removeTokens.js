const { authService } = require('../sevices');

module.exports = async () => {
    await authService.removeExpiredRefreshTokens();
};
