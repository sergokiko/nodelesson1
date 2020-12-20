require('dotenv').config();
const {
    DB_USERNAME, DB_PASSWORD, DB_NAME, HOST
} = require('./config');
const { DIALECT } = require('../constants/constants');

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: HOST,
        dialect: DIALECT
    },
};
