const { getGroqResponse } = require("../config/groqConfig"); // <-- updated import

// Import document store from fileUploadController
const { documentStore } = require("../controllers/fileUploadController");

class MessageController {
  async sendMessage(req, res, next) {
    const { message: userMessage, documentId } = req.body;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ 
        success: false,
        error: "Invalid or missing message" 
      });
    }

    const startTime = Date.now();

    try {
      // Get document context if documentId is provided
      let documentContext = null;
      if (documentId && documentStore.has(documentId)) {
        const document = documentStore.get(documentId);
        documentContext = document.content;
      }

      const stream = await getGroqResponse(userMessage, documentContext); // <-- updated function call

      // Set headers for streaming response
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      let buffer = "";

      stream.on("data", (chunk) => {
        const chunkStr = chunk.toString();
        buffer += chunkStr;
        
        // Process complete lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (line.trim() === "") continue;
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                res.write(content);
              }
            } catch (parseError) {
              console.warn("Failed to parse chunk:", data);
            }
          }
        }
      });

      stream.on("end", () => {
        const duration = Date.now() - startTime;
        console.log(`✅ Groq responded in ${duration} ms`); // <-- updated label
        res.end();
      });

      stream.on("error", (error) => {
        console.error("❌ Groq stream error:", error); // <-- updated label
        if (!res.headersSent) {
          res.status(500).json({ 
            success: false,
            error: "Failed to stream response from AI" 
          });
        } else {
          res.end();
        }
      });
    } catch (error) {
      console.error("❌ Groq error:", error.message); // <-- updated label
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      next(error);
    }
  }
}

module.exports = new MessageController();
