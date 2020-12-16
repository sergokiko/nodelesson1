const { Router } = require('express');
const { carMiddlewares } = require('../middlewares');
const { carController } = require('../controllers');

const carRouter = Router();

carRouter.get('/',
    carMiddlewares.checkIfBaseNotEmpty,
    carController.getAllCars);

carRouter.post('/',
    carMiddlewares.checkIfCarValid,
    carController.careateNewCar);

carRouter.delete('/:id',
    carMiddlewares.checkIfBaseNotEmpty,
    carMiddlewares.checkIfCarForDeleteExistInBase,
    carController.deleteCar);

carRouter.put('/:id',
    carMiddlewares.checkIfBaseNotEmpty,
    carMiddlewares.checkUpdateDataValidity,
    carController.updateCar);

module.exports = carRouter;
