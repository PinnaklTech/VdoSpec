const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Python microservice base URL
const PYTHON_BASE_URL = "http://127.0.0.1:8001";

// ---- Upload File to Python ----
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const docId = req.body.docId || "default_doc";

    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));
    formData.append("doc_id", docId);

    const response = await axios.post(`${PYTHON_BASE_URL}/upload`, formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(file.path); // remove temp file
    res.json({ success: true, response: response.data });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---- Ask Question, Get Answer from Groq ----
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    const formData = new FormData();
    formData.append("query", question);
    formData.append("k", 3); // top 3 chunks for RAG

    const { data } = await axios.post(`${PYTHON_BASE_URL}/retrieve`, formData, {
      headers: formData.getHeaders(),
    });

    const topChunks = data.top_chunks;
    // Truncate context to 48,000 characters (about 12,000 tokens)
    function truncateText(text, maxChars = 48000) {
      return text.length > maxChars ? text.slice(0, maxChars) + "\n\n[Truncated]" : text;
    }
    let context = topChunks.join("\n\n");
    const MAX_CONTEXT_CHARS = 20000; // Lowered from 48000 for extra safety
    if (context.length > MAX_CONTEXT_CHARS) {
      return res.status(400).json({
        success: false,
        error: "This document is too large for analysis. Please upload a smaller document or split it into parts."
      });
    }
    context = truncateText(context);

    // Debug logging
    console.log("Context length (chars):", context.length);
    const messages = [
      { role: "system", content: "You are a helpful AI assistant. The user has uploaded a document. Here is the content of the document:\n\n---DOCUMENT CONTENT---\n" + context + "\n---END DOCUMENT CONTENT---\n\nPlease answer questions based on this document content." },
      { role: "user", content: question },
    ];
    console.log("Sending prompt length:", JSON.stringify(messages).length);

    const payload = {
      model: "llama3-70b-8192",
      messages,
    };

    // Send to Groq LLaMA
    const groqResponse = await axios.post("https://api.groq.com/openai/v1/chat/completions", payload, {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const answer = groqResponse.data.choices[0].message.content;
    res.json({ success: true, answer });
  } catch (error) {
    console.error("Ask Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
