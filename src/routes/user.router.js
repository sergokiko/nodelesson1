const { Router } = require('express');
const { userController } = require('../controllers');
const {
    userMiddlewares,
    authMiddlewares,
    checkFileMiddlewares,
    checkAvatarMiddlewares
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddlewares.checkIfBaseNotEmpty, userController.getAllUsers);

userRouter.post('/',
    userMiddlewares.checkUserCredentialsValidity,
    userMiddlewares.checkIfEmailExistInBase,
    checkFileMiddlewares.checkFilesTypes,
    checkFileMiddlewares.checkAvatar,
    userController.authNewUser);

userRouter.use('/:id',
    userMiddlewares.checkIfBaseNotEmpty,
    userMiddlewares.checkIfIdValid,
    userMiddlewares.checkIfUserWithThisIdExist,
    authMiddlewares.checkAccessToken,);

userRouter.get('/:id', userController.getUserWithCarById);

userRouter.delete('/:id', userController.deleteUser);

userRouter.put('/:id',
    userMiddlewares.checkUpdateDataValidity,
    checkFileMiddlewares.checkFilesTypes,
    checkFileMiddlewares.checkAvatar,
    userController.updateUser);

module.exports = userRouter;
