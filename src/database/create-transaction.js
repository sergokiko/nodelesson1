const client = require('./index');

module.exports = () => client.sequelize.transaction();
