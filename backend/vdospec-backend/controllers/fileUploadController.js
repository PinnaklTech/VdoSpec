const fs = require("fs");
const extractText = require("../utils/extractText");

// Store document content in memory (in production, use a database)
const documentStore = new Map();

class FileUploadController {
  // Upload and process document
  async uploadDocument(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false,
          error: "No file uploaded" 
        });
      }

      const filePath = req.file.path;
      const fileId = req.file.filename;

      // Reject files that are too large (e.g., >2MB)
      const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
      if (req.file.size > MAX_FILE_SIZE_BYTES) {
        // Clean up the uploaded file
        fs.unlinkSync(filePath);
        return res.status(400).json({
          success: false,
          error: "This document is too large for analysis. Please upload a smaller document or split it into parts."
        });
      }
      
      // Extract text from the uploaded file
      const extractedText = await extractText(filePath, req.file.mimetype);
      
      // Store the document content with metadata
      documentStore.set(fileId, {
        filename: req.file.originalname,
        content: extractedText,
        uploadDate: new Date(),
        mimetype: req.file.mimetype,
        size: req.file.size
      });
      
      // Clean up the uploaded file
      fs.unlinkSync(filePath);
      
      console.log(`✅ Document uploaded: ${req.file.originalname}`);
      res.status(200).json({
        success: true,
        fileId: fileId,
        filename: req.file.originalname,
        size: req.file.size,
        message: "Document uploaded and processed successfully"
      });
    } catch (error) {
      console.error("❌ Document upload failed:", error);
      
      // Clean up file on error
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error("Error cleaning up file:", unlinkError);
        }
      }
      
      next(error);
    }
  }

  // Get document info
  getDocument(req, res, next) {
    try {
      const { fileId } = req.params;
      const document = documentStore.get(fileId);
      
      if (!document) {
        return res.status(404).json({ 
          success: false,
          error: "Document not found" 
        });
      }
      
      res.status(200).json({
        success: true,
        fileId: fileId,
        filename: document.filename,
        uploadDate: document.uploadDate,
        size: document.size,
        mimetype: document.mimetype
      });
    } catch (error) {
      console.error("❌ Get document failed:", error);
      next(error);
    }
  }

  // Delete document
  deleteDocument(req, res, next) {
    try {
      const { fileId } = req.params;
      
      if (documentStore.has(fileId)) {
        documentStore.delete(fileId);
        console.log(`✅ Document deleted: ${fileId}`);
        res.status(200).json({ 
          success: true,
          message: "Document deleted successfully" 
        });
      } else {
        res.status(404).json({ 
          success: false,
          error: "Document not found" 
        });
      }
    } catch (error) {
      console.error("❌ Delete document failed:", error);
      next(error);
    }
  }
}

module.exports = new FileUploadController();
module.exports.documentStore = documentStore;