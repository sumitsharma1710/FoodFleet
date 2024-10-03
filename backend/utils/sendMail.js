const nodemailer = require('nodemailer')

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.to,
      subject: options.subject,
      text: `Click this link to reset password ${options.link}`
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error
  }
};
module.exports = sendMail;