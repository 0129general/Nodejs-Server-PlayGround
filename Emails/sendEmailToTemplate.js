const { sendEmail } = require("./emailClient");

const sendEmailToTemplate = async ({ toEmail, emailType, data, userType }) => {
    // Here we will switch different email templates based on emailType, we will build email template ourselves

    const responseEmail = await sendEmail({
        from: {
            email: "hello@demomailtrap.com", // updated with your sender email here
            name: "SingleCombo",
        },
        to: [
            {
                email: toEmail,
            }
            //  'keyeypee@gmail.com',
        ],
        subject: `Subject of  ${emailType}`,
        emailTemplate: `<div><h1>You are recieving email of ${emailType}</h1><p>Available data is ${JSON.stringify(data)}<p></div>`,
        emailType,
    });

    return responseEmail
};

module.exports = {
    sendEmailToTemplate,
};
