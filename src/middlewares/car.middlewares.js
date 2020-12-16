const { carService } = require('../sevices');
const { carValidator, carUpdateValidator } = require('../validators');

const { ErrorHandler, errors: { NOT_EXIST_IN_BASE } } = require('../error');
const { BAD_REQUEST } = require('../config/responce-codes');

module.exports = {
    checkIfBaseNotEmpty: async (req, res, next) => {
        try {
            const cars = await carService.findCars();

            if (!cars.length) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUpdateDataValidity: (req, res, next) => {
        try {
            const { error } = carUpdateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIfCarForDeleteExistInBase: async (req, res, next) => {
        try {
            const { id } = req.params;
            const cars = await carService.findCars();

            const findCar = cars.find((car) => car.id === id);

            if (!findCar) {
                throw new ErrorHandler(NOT_EXIST_IN_BASE.message, NOT_EXIST_IN_BASE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
