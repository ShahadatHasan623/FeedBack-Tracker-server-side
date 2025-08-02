// openrouter.js
const axios = require("axios");
require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function askQuestion(question) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // You can try other models like 'meta-llama/llama-3-8b-instruct'
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // optional, change to your frontend URL if deployed
          "X-Title": "Feedback Tracker", // your app name
        },
      }
    );

    const answer = response.data.choices?.[0]?.message?.content || "No response.";
    return answer;
  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    throw new Error("Failed to get response from OpenRouter");
  }
}

module.exports = askQuestion;
