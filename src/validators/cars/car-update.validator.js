const Joi = require('joi');

module.exports = Joi.object({
    volume: Joi
        .number(),
    user_id: Joi
        .number()
        .integer()
});
