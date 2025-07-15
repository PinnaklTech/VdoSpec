const nodemailer = require("nodemailer");

// Parse email port
const emailPort = parseInt(process.env.SMTP_EMAIL_PORT, 10);

// SMTP transporter for inquiry emails
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_EMAIL_HOST,
  port: emailPort,
  secure: emailPort === 465, // true for SSL (465), false for TLS (587)
  auth: {
    user: process.env.SMTP_EMAIL_USER,
    pass: process.env.SMTP_EMAIL_PASS,
  },
});

// Gmail transporter for human response emails
const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = {
  smtpTransporter,
  gmailTransporter
};