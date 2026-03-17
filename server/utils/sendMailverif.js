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
    const hour_send = new Date().getHours();
    let min_send = new Date().getMinutes();
    if (min_send < 10) min_send = `0${min_send}`;
    var temps = `${hour_send}:${min_send}`;
    console.log(temps);
    return {
      status: 200,
      message: "mail sended",
      temps: temps,
    };
  } catch {
    return { status: 500, message: "mail not sended" };
  }
}

module.exports = { createMail, senMail };
