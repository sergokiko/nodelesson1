const mailAction = require('../constants/email-actions.emun');

module.exports = {
    [mailAction.WELCOME]: {
        subject: 'WELOCME ON BOARD',
        templateName: 'welcome'
    },

    [mailAction.USER_DELETED]: {
        subject: 'Your account is deleted',
        templateName: 'deleted-user'
    }
};
