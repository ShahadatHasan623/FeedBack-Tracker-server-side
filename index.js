const express = require("express");
const cors =require('cors')
const askQuestion = require('./openrouter');

const app = express();
app.use(cors())
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await askQuestion(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
