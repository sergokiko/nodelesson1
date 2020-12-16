const Joi = require('joi');
const { EMAIL, PASSWORD } = require('../../config/regexp.enum');

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi
        .string()
        .regex(EMAIL)
        .required()
        .min(5),
    password: Joi
        .string().regex(PASSWORD).trim()
});
