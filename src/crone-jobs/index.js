const cron = require('node-cron');

const { CRONE_TIME } = require('../constants/constants');
const removeTokens = require('./removeTokens');

module.exports = () => {
    cron.schedule(CRONE_TIME, async () => {
        await removeTokens();
    });
};
