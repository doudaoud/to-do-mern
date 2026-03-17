const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function createMail(email, code) {
  const mail = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Verification de votre email",
    text: `${code}`,
  };
  return mail;
}
async function senMail(mail) {
  try {
    await transporter.sendMail(mail);
    return { status: 200, message: "mail sended" };
  } catch {
    return { status: 500, message: "mail not sended" };
  }
}

module.exports = { createMail, senMail };
