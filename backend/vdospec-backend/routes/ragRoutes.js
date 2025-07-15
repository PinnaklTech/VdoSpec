const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const ragController = require("../controllers/ragController");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.post("/upload", upload.single("file"), ragController.uploadFile);
router.post("/ask", ragController.askQuestion);

module.exports = router;
