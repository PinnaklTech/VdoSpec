const fs = require("fs");
const { smtpTransporter, gmailTransporter } = require("../config/emailTransporter");
const generateEmailTemplate = require("../utils/generateEmailTemplate");

class EmailController {
  // Send inquiry email
  async sendInquiry(req, res, next) {
    try {
      const { name, email, company, message, type } = req.body;

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_EMAIL_USER}>`,
        to: "inquiry@vdospec.com",
        replyTo: email,
        subject: `New Inquiry from ${name}`,
        html: generateEmailTemplate({ name, email, company, message, type }),
      };

      // Respond to the user immediately
      res.status(200).json({ 
        success: true,
        message: "Email sent successfully!" 
      });

      // Send the email in the background
      smtpTransporter.sendMail(mailOptions)
        .then(() => {
          console.log(`✅ Inquiry email sent from ${email} (${name})`);
        })
        .catch((error) => {
          console.error("❌ Inquiry email send failed (background):", error.message);
        });
    } catch (error) {
      console.error("❌ Inquiry email send failed:", error.message);
      next(error);
    }
  }

  // Send human response email
  async sendHumanResponse(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;
      const file = req.file;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Submission From Vdospec",
        text: `Name: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}Message: ${message}`,
        attachments: file ? [{ filename: file.originalname, path: file.path }] : [],
      };

      // Respond to the user immediately
      res.status(200).json({ 
        success: true,
        message: "Submitted successfully!" 
      });

      // Send the email in the background
      gmailTransporter.sendMail(mailOptions)
        .then(() => {
          console.log("✅ Human response email sent successfully");
          // Delete file after sending
          if (file) {
            fs.unlinkSync(file.path);
          }
        })
        .catch((error) => {
          console.error("❌ Human response email failed (background):", error.message);
          // Clean up file on error
          if (file) {
            try {
              fs.unlinkSync(file.path);
            } catch (unlinkError) {
              console.error("Error cleaning up file:", unlinkError);
            }
          }
        });
    } catch (error) {
      console.error("❌ Human response email failed:", error.message);
      // Clean up file on error
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Error cleaning up file:", unlinkError);
        }
      }
      next(error);
    }
  }
}

module.exports = new EmailController();