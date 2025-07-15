const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error
  let statusCode = 500;
  let message = "Internal Server Error";

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = "File too large. Maximum size is 10MB";
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = "Unexpected file field";
  }

  // File type errors
  if (err.message && err.message.includes('Only')) {
    statusCode = 400;
    message = err.message;
  }

  // Validation errors
  if (err.message && err.message.includes('required')) {
    statusCode = 400;
    message = err.message;
  }

  // Email errors
  if (err.message && err.message.includes('email')) {
    statusCode = 400;
    message = "Failed to send email. Please try again.";
  }

  // OpenRouter API errors
  if (err.response && err.response.status) {
    statusCode = 500;
    message = "AI service temporarily unavailable. Please try again.";
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;