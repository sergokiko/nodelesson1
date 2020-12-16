const Joi = require('joi');
const { EMAIL, PASSWORD } = require('../../config/regexp.enum');

module.exports = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL)
        .required()
        .min(5),
    password: Joi
        .string().regex(PASSWORD)
});
