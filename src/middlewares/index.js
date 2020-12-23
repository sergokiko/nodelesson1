module.exports = {
    userMiddlewares: require('./users/user.middlewares'),
    authMiddlewares: require('./auth/auth.middleware'),
    carMiddlewares: require('./car/car.middlewares'),
    checkFileMiddlewares: require('./files'),
    checkAvatarMiddlewares: require('./files/checkfiles.middleware'),
};
