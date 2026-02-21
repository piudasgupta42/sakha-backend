import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_KEY;

app.post("/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
