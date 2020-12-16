const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/config');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '300h' });

    return { access_token, refresh_token };
};
