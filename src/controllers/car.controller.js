const { carService: { findCars, createCar, removeCar, updateCar } } = require('../sevices');
const { CREATED, SUCCESS } = require('../config/responce-codes');

module.exports = {
    getAllCars: async (req, res) => {
        const users = await findCars();

        res.status(SUCCESS).json(users);
    },

    careateNewCar: async (req, res) => {
        const car = req.body;

        const registeredCar = await createCar(car);

        res.status(CREATED).json(registeredCar);
    },

    deleteCar: async (req, res) => {
        const car = await removeCar(req.params.id);

        res.status(SUCCESS).json(car);
    },

    updateCar: async (req, res) => {
        const { id } = req.params;
        const car = req.body;

        const result = await updateCar(id, car);

        res.status(SUCCESS).json(result);
    }
};
