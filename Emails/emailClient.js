const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TRAP_EMAIL_API_TOKEN;



const client = new MailtrapClient({
  token: TOKEN,
  // testInboxId: 3199539, // to review this in paid account
});

const sendEmail = async ({ from, to, subject, emailTemplate, emailType }) => {
  try {
    const emailResponse = await client.send({
      from,
      to,
      subject,
      html: emailTemplate,
      category: emailType,
    })
    return emailResponse

  } catch (error) {
    console.log('----Catch block sendEmail', error)
    return { message: 'something is wrong while sending email', error: error.message }
  }
}

module.exports = {
  sendEmail,
};
