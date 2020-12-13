const { Router } = require('express');
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middlewares');

const userRouter = Router();

userRouter.get('/', userMiddleware.checkIfBaseNotEmpty, userController.getAllUsers);

userRouter.post('/',
    userMiddleware.checkUserCredentialsValidity,
    userMiddleware.checkIfEmailExistInBase,
    userController.authNewUser);

userRouter.get('/:id', userMiddleware.checkIfBaseNotEmpty,
    userMiddleware.checkIfIdValid,
    userMiddleware.checkIfUserWithThisIdExist,
    userController.getUserWithCarById);

userRouter.delete('/:email',
    userMiddleware.checkIfBaseNotEmpty,
    userMiddleware.checkIfEmailForDeleteExistInBase,
    userController.deleteUser);

userRouter.put('/:email', userMiddleware.checkIfBaseNotEmpty,
    userMiddleware.checkIfEmailExistInBase,
    userMiddleware.checkUserCredentialsValidity,
    userController.updateUser);

module.exports = userRouter;
