const { BAD_REQUEST, NO_CONTENT, UNAUTHORIZED } = require('../config/responce-codes');

module.exports = {
    NOT_VALID_ID: {
        message: 'not valid id',
        code: BAD_REQUEST
    },

    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: BAD_REQUEST
    },

    NOT_EXIST_IN_BASE: {
        message: 'data not exist in base',
        code: NO_CONTENT
    },
    ALREADY_EXIST_IN_BASE: {
        message: 'this user already exist',
        code: BAD_REQUEST
    },
    NOT_VALID_TOKEN: {
        message: 'please login',
        code: UNAUTHORIZED
    },
    TOO_BIG_FILE: {
        message: 'Too big file',
        code: BAD_REQUEST
    },

    CAR_PHOTOS_LIMIT: {
        message: 'You have reached max photo quantity',
        code: BAD_REQUEST
    },
    CAR_DOC_LIMIT: {
        message: 'You have reached max doc quantity',
        code: BAD_REQUEST
    },

    WRONG_FILE_EXTENSION: {
        message: 'Wrong file extension',
        code: BAD_REQUEST
    },

    JUST_ONE_PHOTO: {
        message: 'You can upload just one photo as avatar',
        code: BAD_REQUEST
    },
    WRONG_TEMPLATE_NAME: {
        message: 'Wrong template name',
        code: BAD_REQUEST
    },
};
