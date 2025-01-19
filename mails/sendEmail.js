
const nodemailer = require("nodemailer");
const createTextBody = require("./createTextBody")
const createHTMLBody = require("./createHTMLBody");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "trainingtech84@gmail.com",
    pass: process.env.SEND_EMAIL_SECRET,
  },
});

async function sendEmail(user) {
  const emailOptions = {
    from: '"Jeancy24Sur " <trainingtech84@gmail.com>',
    to: user.email, // User's email
    subject: "Welcome to Our Service", // Subject line
    text: createTextBody(user), // Plain text body
    html: createHTMLBody(user), // HTML body
  };

  try {
    const info = await transporter.sendMail(emailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
