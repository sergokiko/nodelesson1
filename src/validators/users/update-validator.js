const Joi = require('joi');

const { PASSWORD, EMAIL } = require('../../config/regexp.enum');

module.exports = Joi.object({
    login: Joi.string().regex(EMAIL).trim(),
    password: Joi.string().regex(PASSWORD).trim()
});
