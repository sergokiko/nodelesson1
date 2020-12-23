const { ErrorHandler, errors } = require('../../error');
const {
    FILE_MAX_SIZE, PHOTO_MAX_SIZE, DOCS_MIMETYPES, PHOTOS_MIMETYPES
} = require('../../constants/constants');

module.exports = (req, res, next) => {
    try {
        const files = req;

        const docs = [];
        const photos = [];

        const allFiles = Object.values(files);

        for (let i = 0; i < allFiles.length; i++) {
            const { mimetype, size } = allFiles[i];

            if (DOCS_MIMETYPES.includes(mimetype)) {
                if (size > FILE_MAX_SIZE) {
                    throw new ErrorHandler(errors.TOO_BIG_FILE.message, errors.TOO_BIG_FILE.code);
                }
                docs.push(allFiles[i]);
            } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
                if (size > PHOTO_MAX_SIZE) {
                    throw new ErrorHandler(errors.TOO_BIG_FILE.message, errors.TOO_BIG_FILE.code);
                }
                photos.push(allFiles[i]);
            } else {
                throw new ErrorHandler(errors.WRONG_FILE_EXTENSION.message, errors.WRONG_FILE_EXTENSION.code);
            }
        }
        req.photos = photos;
        req.docs = docs;
    } catch (e) {
        next(e);
    }
};
