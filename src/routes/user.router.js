const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddlewares, authMiddlewares } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddlewares.checkIfBaseNotEmpty, userController.getAllUsers);

userRouter.post('/',
    userMiddlewares.checkUserCredentialsValidity,
    userMiddlewares.checkIfEmailExistInBase,
    userController.authNewUser);

userRouter.get('/:id', userMiddlewares.checkIfBaseNotEmpty,
    userMiddlewares.checkIfIdValid,
    userMiddlewares.checkIfUserWithThisIdExist,
    authMiddlewares.checkAccessToken,
    userController.getUserWithCarById);

userRouter.delete('/:id',
    userMiddlewares.checkIfBaseNotEmpty,
    userMiddlewares.checkIfIdValid,
    userMiddlewares.checkIfUserWithThisIdExist,
    authMiddlewares.checkAccessToken,
    userController.deleteUser);

userRouter.put('/:id', userMiddlewares.checkIfBaseNotEmpty,
    userMiddlewares.checkIfIdValid,
    userMiddlewares.checkIfUserWithThisIdExist,
    userMiddlewares.checkUpdateDataValidity,
    authMiddlewares.checkAccessToken,
    userController.updateUser);

module.exports = userRouter;
