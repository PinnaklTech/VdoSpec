const express = require("express");
const multer = require("multer");
const emailController = require("../controllers/emailController");
const { validateInquiry, validateHumanResponse } = require("../middleware/validateEmail");

const router = express.Router();

// Configure multer for human response uploads
const upload = multer({ 
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Email routes
router.post("/inquiry-email", validateInquiry, emailController.sendInquiry);
router.post("/send-email", upload.single("file"), validateHumanResponse, emailController.sendHumanResponse);

module.exports = router;