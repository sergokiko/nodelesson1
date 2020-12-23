const { Router } = require('express');
const { carMiddlewares, authMiddlewares, checkFileMiddlewares,  } = require('../middlewares');
const { carController } = require('../controllers');


const carRouter = Router();

carRouter.get('/',
    carMiddlewares.checkIfBaseNotEmpty,
    carController.getAllCars);

carRouter.post('/',
    carMiddlewares.checkIfCarValid,
    authMiddlewares.checkAccessToken,
    checkFileMiddlewares.checkFilesTypes,
    checkFileMiddlewares.checkDocQuantity,
    checkFileMiddlewares.checkPhotoQuantity,
    carController.careateNewCar);

carRouter.use('/:id', authMiddlewares.checkAccessToken,
    carMiddlewares.checkIfBaseNotEmpty);

carRouter.delete('/:id',
    carMiddlewares.checkIfCarForDeleteExistInBase,
    carController.deleteCar);

carRouter.put('/:id',
    carMiddlewares.checkUpdateDataValidity,
    checkFileMiddlewares,
    checkFileMiddlewares.checkDocQuantity,
    checkFileMiddlewares.checkPhotoQuantity,
    carController.updateCar);

module.exports = carRouter;
