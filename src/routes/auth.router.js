const { Router } = require('express');
const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const authRouter = Router();

authRouter.get('/login', authController.getLoginPage);
authRouter.post('/login', authMiddleware.checkUserValidity, authMiddleware.checkIfEmailAndPasswordCorrect,
    authMiddleware.checkPasswordLength, authController.loginUser);

authRouter.get('/logout', authController.logout);

authRouter.get('/register', authController.authGet);
authRouter.post('/register', authMiddleware.checkIfUserExistInBase, authMiddleware.checkUserValidity, authController.authNewUser);

module.exports = authRouter;
