const { Router } = require('express');
const { carMiddlewares, authMiddlewares } = require('../middlewares');
const { carController } = require('../controllers');

const carRouter = Router();

carRouter.get('/',
    carMiddlewares.checkIfBaseNotEmpty,
    carController.getAllCars);

carRouter.post('/',
    carMiddlewares.checkIfCarValid,
    authMiddlewares.checkAccessToken,
    carController.careateNewCar);

carRouter.use('/:id', authMiddlewares.checkAccessToken,
    carMiddlewares.checkIfBaseNotEmpty);

carRouter.delete('/:id',
    carMiddlewares.checkIfCarForDeleteExistInBase,
    carController.deleteCar);

carRouter.put('/:id',
    carMiddlewares.checkUpdateDataValidity,
    carController.updateCar);

module.exports = carRouter;
