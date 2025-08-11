const axios = require("axios");
require("dotenv").config();

/**
 * generateCode Controller
 * -----------------------
 * Accepts a prompt from the frontend and uses the OpenRouter API (GPT-3.5-turbo)
 * to generate complete HTML, CSS, and JS code for a functional website.
 *
 * The AI prompt includes strict formatting instructions to ensure clean, 
 * separated code blocks for HTML, CSS, and JavaScript.
 */
const generateCode = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Call OpenRouter API to get AI-generated website code
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert full-stack web developer. You always generate complete HTML, CSS, and JS code for fully functional websites. You do not skip any part and always include realistic content and interactivity.",
          },
          {
            role: "user",
            content: `You are an expert web developer AI.

Your task is to generate a fully functional and complete website using **HTML, CSS, and JavaScript** based on this request: "${prompt}"

🛠️ IMPORTANT INSTRUCTIONS:
- Always generate **complete and working code**.
- Include all **necessary UI components**, styling, and JS functionality.
- Never leave placeholders like "write JS yourself" — always implement it.
- If the request is vague, use **realistic dummy data** (e.g., example projects, dishes, products, etc.).
- Ensure **modern, responsive design** using Flexbox or Grid.
- Use clean, professional styling with good spacing, colors, buttons, and layout.
- Structure your output using **three separate code blocks** in this exact order:

\`\`\`html
<!-- Complete HTML code goes here -->
\`\`\`

\`\`\`css
/* Complete CSS code goes here */
\`\`\`

\`\`\`js
// Complete JavaScript code goes here
\`\`\`

Example use cases: portfolio, Swiggy clone, calculator, to-do app, blog, e-commerce store, hotel booking, weather app, resume builder, etc.

⚠️ Only return the code. Do not explain or include any text outside the code blocks.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // API key stored in .env
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // Optional for API tracking
        },
      }
    );

    // Extract the code content from API response
    const code = response.data.choices[0].message.content;
    res.json({ code });
  } catch (error) {
    // Log error and return response
    console.error(
      "Error generating code:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Code generation failed" });
  }
};

module.exports = { generateCode };
