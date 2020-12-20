const { Router } = require('express');
const { authMiddlewares } = require('../middlewares');
const { authController } = require('../controllers');

const authRouter = Router();

authRouter.post('/',
    authMiddlewares.checkIfCredentialsValid,
    authMiddlewares.isUserExist,
    authMiddlewares.checkPasswordHash,
    authController.loginUser);

authRouter.post('/logout', authController.logoutUser);

authRouter.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);

module.exports = authRouter;
