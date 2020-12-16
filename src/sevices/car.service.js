const { CarModel } = require('../database/models');

module.exports = {
    findCars: () => CarModel.findAll(),

    createCar: (car) => CarModel.create(car),

    removeCar: (id) => CarModel.destroy({
        where: { id }
    }),

    updateCar: (id, car) => CarModel.update(
        car,
        { where: { id } }
    )

};
