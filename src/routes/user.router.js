const { Router } = require('express');
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:email', userMiddleware.checkIfEmailValid, userMiddleware.checkIfUserExist, userController.getUserByEmail);

userRouter.delete('/:email', userMiddleware.checkIfEmailForDeleteIsValid, userController.deleteUser);

// eslint-disable-next-line max-len
userRouter.post('/', userMiddleware.checkIfUserExist, userMiddleware.checkUserCredentialsValidity, userController.authNewUser);

module.exports = userRouter;
