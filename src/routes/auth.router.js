const { Router } = require('express');
const { authMiddlewares } = require('../middlewares');
const { authController } = require('../controllers');

const authRouter = Router();

authRouter.post('/',
    authMiddlewares.checkIfCredentialsValid,
    authMiddlewares.isUserExist,
    authMiddlewares.checkPasswordHash,
    authController.loginUser);

module.exports = authRouter;
