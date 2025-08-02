const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function askQuestion(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or gpt-4 if allowed
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get response from LLM");
  }
}

module.exports = askQuestion;