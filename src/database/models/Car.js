const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index');
const { foreign_key } = require('../../constants/constants');

class CarModel extends Model {
}

CarModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    model: {
        type: DataTypes.STRING,
        allowNull: false
    },

    volume: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}, { sequelize });

const UserModel = require('./User');

CarModel.belongsTo(UserModel, { foreignKey: foreign_key.USER_ID });

module.exports = CarModel;
