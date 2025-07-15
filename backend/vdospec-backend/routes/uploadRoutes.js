const express = require("express");
const multer = require("multer");
const fileUploadController = require("../controllers/fileUploadController");

const router = express.Router();

// Configure multer for document uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed!'), false);
    }
  }
});

// Upload routes
router.post("/upload", upload.single('document'), fileUploadController.uploadDocument);
router.get("/document/:fileId", fileUploadController.getDocument);
router.delete("/document/:fileId", fileUploadController.deleteDocument);

module.exports = router;