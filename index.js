const express =require('express');
const cors =require('cors');
const app =express();
const PORT = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors())
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const answer = await askQuestion(question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/',(req,res)=>{
    res.send('feddback tracker server is running')
})

app.listen(PORT,()=>{
    console.log(`Feedback job tracker https://localhost:${PORT}`)
})
