const { Router } = require('express');
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middlewares');

const userRouter = Router();

userRouter.get('/', userMiddleware.checkIfBaseNotEmpty, userController.getAllUsers);

userRouter.post('/',
    userMiddleware.checkUserCredentialsValidity,
    userMiddleware.checkIfEmailForDeleteExistInBase,
    userMiddleware.checkPasswordValidity,
    userController.authNewUser);

userRouter.get('/:id', userMiddleware.checkIfBaseNotEmpty,
    userMiddleware.checkIfIdValid,
    userMiddleware.checkIfUserWithThisIdExist,
    userController.getUserWithCarById);

userRouter.delete('/:email',
    userMiddleware.checkIfBaseNotEmpty,
    userMiddleware.checkIfEmailExistInBase,
    userController.deleteUser);

userRouter.put('/:email', userMiddleware.checkIfBaseNotEmpty,
    userMiddleware.checkIfEmailValid,
    userMiddleware.checkIfEmailExistInBase,
    userMiddleware.checkPasswordValidity,
    userController.authNewUser);

module.exports = userRouter;
