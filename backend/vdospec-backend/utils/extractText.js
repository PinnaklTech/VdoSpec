const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

// Helper function to extract text from different file types
async function extractText(filePath, mimetype) {
  try {
    switch (mimetype) {
      case 'application/pdf':
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        return pdfData.text;
        
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docxBuffer = fs.readFileSync(filePath);
        const docxResult = await mammoth.extractRawText({ buffer: docxBuffer });
        return docxResult.value;
        
      case 'application/msword':
        // For older .doc files, you might need additional libraries
        throw new Error('Legacy .doc files are not supported. Please convert to .docx format.');
        
      case 'text/plain':
        return fs.readFileSync(filePath, 'utf8');
        
      default:
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
}

module.exports = extractText;