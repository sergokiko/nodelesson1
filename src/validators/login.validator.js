const Joi = require('joi');
const { EMAIL, PASSWORD } = require('../config/regexp.enum');

module.exports = Joi.object.keys({
    email: Joi
        .string()
        .regex(EMAIL)
        .required()
        .min(5)
        .trim(),
    password: Joi
        .string().regex(PASSWORD).trim()
});
