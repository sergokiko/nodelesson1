const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { car_files_types } = require('../constants/constants');
const {
    carService: {
        findCars, createCar, removeCar, updateCar, updateSingleCarFiles
    }
} = require('../sevices');
const { CREATED, SUCCESS } = require('../config/responce-codes');
const transactionInstance = require('../database/create-transaction');

module.exports = {
    getAllCars: async (req, res) => {
        const users = await findCars();

        res.status(SUCCESS).json(users);
    },

    careateNewCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const car = req.body;
            const { photos, docs } = req;

            const registeredCar = await createCar(car);

            if (photos) {
                const photosPathWithoutPublic = path.join('cars', `${registeredCar.id}`, 'car photos');
                const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                await fs.mkdir(photosFullPath, { recursive: true });

                photos.map(async (photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const photoName = `${uuid}.${photoExtension}`;

                    await photo.mv(path.join(photosFullPath, photoName));

                    const file_type = car_files_types.PHOTO;
                    const file_path = await path.join(photosFullPath, photoName);

                    await updateSingleCarFiles({ file_type, file_path }, registeredCar.id);
                });
            }

            if (docs) {
                const docPathWithoutPublic = path.join('cars', `${registeredCar.id}`, 'car docs');
                const docFullPath = path.join(process.cwd(), 'public', docPathWithoutPublic);

                await fs.mkdir(docFullPath, { recursive: true });

                docs.map(async (photo) => {
                    const docExtension = photo.name.split('.').pop();
                    const docName = `${uuid}.${docExtension}`;

                    await photo.mv(path.join(docFullPath, docName));

                    const file_type = car_files_types.PHOTO;
                    const file_path = await path.join(docFullPath, docName);

                    await updateSingleCarFiles({ file_type, file_path }, registeredCar.id);
                });
            }

            await transaction.commit();

            res.status(CREATED).json(registeredCar);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const id = req.params;

            const carForDeletePath = path.join(process.cwd(), 'public', 'cars', `${id}`);

            await fs.rmdir(carForDeletePath, { recursive: true });
            const car = await removeCar(id);

            await transaction.commit();

            res.status(SUCCESS).json(car);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                params: { id },
                body: { car },
                photos,
                docs
            } = req;

            if (photos.length) {
                const photosPathWithoutPublic = path.join('cars', `${id}`, 'car photos');
                const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                await fs.mkdir(photosFullPath, { recursive: true });

                photos.map(async (photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const photoName = `${uuid}.${photoExtension}`;

                    await photo.mv(path.join(photosFullPath, photoName));

                    const file_type = car_files_types.PHOTO;
                    const file_path = await path.join(photosFullPath, photoName);

                    updateSingleCarFiles({ file_type, file_path }, id);
                });
            }

            if (docs.length) {
                const docPathWithoutPublic = path.join('cars', `${id}`, 'car docs');
                const docFullPath = path.join(process.cwd(), 'public', docPathWithoutPublic);

                await fs.mkdir(docFullPath, { recursive: true });

                docs.map(async (photo) => {
                    const docExtension = photo.name.split('.').pop();
                    const docName = `${uuid}.${docExtension}`;

                    await photo.mv(path.join(docFullPath, docName));

                    const file_type = car_files_types.PHOTO;
                    const file_path = await path.join(docFullPath, docName);

                    updateSingleCarFiles({ file_type, file_path }, id);
                });
            }

            const result = await updateCar(id, car);

            await transaction.commit();

            res.status(SUCCESS).json(result);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
