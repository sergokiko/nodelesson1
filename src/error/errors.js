const { BAD_REQUEST, NO_CONTENT } = require('../config/responce-codes');

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
    }
};
