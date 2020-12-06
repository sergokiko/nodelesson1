const { Router } = require('express');
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddleware.checkUserCredentialsValidity, userMiddleware.checkIfEmailForDeleteExistInBase,
    userMiddleware.checkPasswordValidity, userController.authNewUser);

userRouter.get('/:id', userMiddleware.checkIfIdValid, userMiddleware.checkIfUserWithThisIdExist,
    userController.getUserWithCarById);

userRouter.delete('/:email', userMiddleware.checkIfEmailExistInBase, userController.deleteUser);

userRouter.put('/:email', userMiddleware.checkIfEmailValid, userMiddleware.checkIfEmailExistInBase,
    userMiddleware.checkPasswordValidity, userController.authNewUser);

module.exports = userRouter;
