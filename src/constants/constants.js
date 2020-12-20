module.exports = {
    AUTHORIZATION: 'Authorization',
    ACCESS_TOKEN_EXPIRE_TIME: '10m',
    REFRESH_TOKEN_EXPIRE_TIME: '30d',
    DIALECT: 'mysql',
    NOW: 'NOW',
    CASCADE: 'cascade',
    table_names: {
        CARS: 'cars',
        USERS: 'user',
        TOKEN: 'Token',
    },

    foreign_key: {
        USER_ID: 'user_id',
        ID: 'id'
    }
};
