const { ErrorHandler, errors: { CAR_PHOTOS_LIMIT } } = require('../../error');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 10) {
            throw new ErrorHandler(CAR_PHOTOS_LIMIT.message, CAR_PHOTOS_LIMIT.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
