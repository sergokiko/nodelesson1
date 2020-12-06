const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('database',
    'user',
    'Password1!', {
        host: 'localhost',
        dialect: 'mysql'
    });
