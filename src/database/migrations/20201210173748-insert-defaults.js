module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('user', [{ name: 'sergio', email: 'sergo@gmail.com', password: '12345678' }]);
        await queryInterface.bulkInsert('cars', [{ model: 'Ford', user_id: 1 }]);
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('user', null, {});
        await queryInterface.bulkDelete('cars', null, {});
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
