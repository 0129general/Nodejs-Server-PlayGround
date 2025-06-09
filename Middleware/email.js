const nodemailer = require('nodemailer');
const WelcomeEmailMasterAdmin = require('../EmailTemplates/WelcomeAdminEmail');
const ResetPasswordEmail = require('../EmailTemplates/ResetPasswordEmail');

module.exports = async (req, res, next, params, template = 'default') => {
    // console.log( "77777",params,template )


    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === 465, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // sending mail to

    let mailOptions = null;
    switch (template) {
        case 'SiginupWelcome_MasterAdmin':
            mailOptions = await WelcomeEmailMasterAdmin(req, res, next, params);
            break;

        case 'ResetPasswordCommon':
            mailOptions = await ResetPasswordEmail(req, res, next, params);
            break;


        default:
            mailOptions = await ResetPasswordEmail(req, res, next, params);
            break;
    }

    const info = await transporter.sendMail(mailOptions);
    return info;
};
