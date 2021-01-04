const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { hashPassword } = require('../helpers');

const {
    emailService,
    userService: {
        findUsers,
        removeUser,
        findUserById,
        createUser,
        updateUser,
        updateAvatar
    }
} = require('../sevices');

const transactionInstance = require('../database/create-transaction');

const { CREATED, SUCCESS } = require('../config/responce-codes');
const { WELCOME, USER_DELETED } = require('../constants/email-actions.emun');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await findUsers();

        res.status(SUCCESS).json(users);
    },
    authNewUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { body: { user }, avatar } = req;

            user.password = await hashPassword(user.password);

            const registeredUser = await createUser(user, transaction);

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${registeredUser.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', 'user', `${registeredUser.id}`, 'photos');
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));
                await updateAvatar({ avatar: finalPhotoPath }, registeredUser.id);
            }

            await emailService.sendEmail(user.email, WELCOME, { userName: user.name });
            await transaction.commit();

            res.status(CREATED).json(registeredUser);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const user = await removeUser(req.params.id);

            await emailService.sendEmail(user.email, USER_DELETED, { userName: user.name });

            await transaction.commit();

            res.status(SUCCESS).json(user);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    getUserWithCarById: async (req, res) => {
        const { id } = req.params;
        const foundedUser = await findUserById(id);

        res.status(SUCCESS).json(foundedUser);
    },

    updateUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                avatar,
                params: { id },
                body: { user }
            } = req;

            user.password = await hashPassword(user.password);

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', 'user', `${id}`, 'photos');
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));
                await updateAvatar({ avatar: finalPhotoPath }, id);
            }

            const result = await updateUser(id, user);

            await transaction.commit();

            res.status(SUCCESS).json(result);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }

};
