const cors = require("cors");

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:8080",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);