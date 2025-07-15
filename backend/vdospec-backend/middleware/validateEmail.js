// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Middleware to validate inquiry email
const validateInquiry = (req, res, next) => {
  const { name, email, message } = req.body;

  // Check required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required."
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format."
    });
  }

  next();
};

// Middleware to validate human response email
const validateHumanResponse = (req, res, next) => {
  const { name, email, message } = req.body;

  // Check required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required."
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format."
    });
  }

  next();
};

module.exports = {
  validateInquiry,
  validateHumanResponse
};