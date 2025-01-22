const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.USEREMAIL;
const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: USER,
    pass: PASS
  }
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: USER,
    to,
    subject,
    html: text
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;