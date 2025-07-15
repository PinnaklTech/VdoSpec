const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

// Import configurations
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const emailRoutes = require("./routes/emailRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const messageRoutes = require("./routes/messageRoutes");
const ragRoutes = require("./routes/ragRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS Middleware (Must be first)
app.use(corsOptions);

// ✅ Handle preflight requests
app.options('*', corsOptions);

// ✅ Protect against malformed URIs
app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
    next();
  } catch (err) {
    console.warn("⚠️ Malformed request detected:", req.path);
    return res.status(400).json({ error: "Bad Request" });
  }
});

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure uploads directory exists
const UPLOADS_DIR = "uploads";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Vdospec AI Backend API",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api", emailRoutes);
app.use("/api", uploadRoutes);
app.use("/api", messageRoutes);
app.use("/api", ragRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;