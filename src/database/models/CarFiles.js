const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index');
const { foreign_key, CAR_MODEL } = require('../../constants/constants');

class CarFiles extends Model {
}

CarFiles.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: CAR_MODEL,
            key: foreign_key.CAR_FOREIGN_KEY
        }
    },
    file_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize });

module.exports = CarFiles;
