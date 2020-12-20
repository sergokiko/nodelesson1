const {
    NOW,
    CASCADE,
    tableNames: { USERS, CARS, TOKEN },
    foreign_key: { ID }
} = require('../../constants/constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(USERS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        });

        await queryInterface.createTable(CARS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            model: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: USERS,
                    key: ID
                },
            }
        });

        await queryInterface.createTable(TOKEN, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            accessToken: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            refreshToken: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: USERS,
                    key: ID
                },
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable(USERS);
        await queryInterface.dropTable(CARS);
        await queryInterface.dropTable(TOKEN);
    }
};
