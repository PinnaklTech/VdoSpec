const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

// Message routes
router.post("/message", messageController.sendMessage);

module.exports = router;