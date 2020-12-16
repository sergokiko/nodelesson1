const Joi = require('joi');

module.exports = Joi.object({
    model: Joi
        .string()
        .alphanum()
        .max(20)
        .required(),
    volume: Joi
        .number()
        .required(),
    user_id: Joi
        .number()
        .integer()
});
