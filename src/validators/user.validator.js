const Joi = require('joi');
const { EMAIL, PASSWORD } = require('../config/regexp.enum');

module.exports = Joi.object.keys({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL)
        .required()
        .min(5)
        .trim(),
    password: Joi
        .string().regex(PASSWORD).trim()
});
