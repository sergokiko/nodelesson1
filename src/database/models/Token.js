const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index');
const { foreign_key } = require('../../constants/constants');

class TokenModel extends Model {
}

TokenModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize });

const User = require('./User');

TokenModel.belongsTo(User, { foreignKey: foreign_key.USER_ID });

module.exports = TokenModel;
