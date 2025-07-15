 function generateEmailTemplate({ name, email, company, message, type }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>New Inquiry from ${name}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f6f8;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #fff;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .header {
          background-color: #1e293b;
          color: white;
          padding: 24px 32px;
        }
        .header h1 {
          margin: 0;
          font-size: 22px;
        }
        .content {
          padding: 32px;
        }
        .label {
          font-weight: bold;
          color: #1e293b;
          margin-top: 16px;
          margin-bottom: 4px;
        }
        .value {
          margin-bottom: 12px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #888;
          background-color: #f8fafc;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Inquiry from ${name}</h1>
        </div>
        <div class="content">
          <p>You received a new inquiry via the Vdospec AI contact form:</p>

          <div class="label">Name</div>
          <div class="value">${name}</div>

          <div class="label">Email</div>
          <div class="value">${email}</div>

          <div class="label">Company</div>
          <div class="value">${company || 'N/A'}</div>

          <div class="label">Inquiry Type</div>
          <div class="value">${type || 'General'}</div>

          <div class="label">Message</div>
          <div class="value">${message}</div>

          
        </div>
        <div class="footer">
          © 2025 Vdospec AI · Automated form submission
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateEmailTemplate;
