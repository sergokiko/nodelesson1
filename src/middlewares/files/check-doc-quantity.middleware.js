const { ErrorHandler, errors: { CAR_DOC_LIMIT } } = require('../../error');

module.exports = (req, res, next) => {
    try {
        if (req.docs.length > 10) {
            throw new ErrorHandler(CAR_DOC_LIMIT.message, CAR_DOC_LIMIT.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
