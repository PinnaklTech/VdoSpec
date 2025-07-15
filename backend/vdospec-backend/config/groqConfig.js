const axios = require("axios");

// Get Groq API key from environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error("Error: GROQ_API_KEY not found in environment variables");
  process.exit(1);
}

// Helper function to call Groq API
async function getGroqResponse(prompt, documentContext = null) {
  let systemMessage = `You are an intelligent assistant specialized in interpreting industrial specifications, engineering standards, and technical documents.

Your responsibilities:
- Provide accurate, standards-compliant answers.
- Base your answers strictly on the provided document content.
- If a user question refers to information not found in the document, clearly respond: “The document does not contain information about this.”
- Do not make assumptions or add information that isn't explicitly present in the document.
- Answer in a professional, concise, and technically sound manner.

Use bullet points or section headings when helpful. When referencing parts of the document, be specific and clear.`;

  
  if (documentContext) {
    systemMessage = `
You are an intelligent assistant specialized in interpreting industrial specifications and technical standards.

Below is the uploaded document content:

---DOCUMENT CONTENT---
${documentContext}
---END DOCUMENT CONTENT---

Please answer all user questions **strictly** based on the content above.
- Do not add any extra information not found in the document.
- If the answer is not in the document, clearly say: “The document does not contain information about this.”
- Your responses should be accurate, clear, and professional.
`;
  }

  const messages = [
    {
      role: "system",
      content: systemMessage
    },
    {
      role: "user",
      content: prompt
    }
  ];

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-70b-8192", //"llama3-70b-8192"
      messages: messages,
      stream: true
    },
    {
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      responseType: "stream"
    }
  );

  return response.data;
}

module.exports = {
  getGroqResponse
};
