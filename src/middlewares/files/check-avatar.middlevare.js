const { ErrorHandler, errors } = require('../../error');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 1) {
            throw new ErrorHandler(errors.JUST_ONE_PHOTO.message, errors.JUST_ONE_PHOTO.code);
        }

        [req.avatar] = req.photos;
    } catch (e) {
        next(e);
    }
};
