const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddleware.checkIfUserIsLogged, userController.getAllUsers);

userRouter.get('/:email', userMiddleware.checkIfEmailValid, userMiddleware.checkIfUserExist, userController.getUserByEmail);

userRouter.delete('/:email', userMiddleware.checkIfEmailForDeleteIsValid, userController.deleteUser);

module.exports = userRouter;
