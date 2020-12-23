const mailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');

const templatesInfo = require('../email-templates');

const { EMAIL_PASS, EMAIL_USER } = require('../config/config');
const { EMAIL_SERVICE } = require('../constants/constants');

const { errors, ErrorHandler } = require('../error');

const transporter = mailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        pass: EMAIL_PASS,
        user: EMAIL_USER
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const sendEmail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(errors.WRONG_TEMPLATE_NAME.message, errors.WRONG_TEMPLATE_NAME.code);
        }

        const html = await emailTemplates.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {

    }
};

module.exports = { sendEmail };
