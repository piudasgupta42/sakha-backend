import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

    console.log("Gemini Raw:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.json({ reply: "Gemini failed. Check API key." });
    }

    res.json({ reply });

  } catch (error) {
    console.log("Server Error:", error);
    res.json({ reply: "Server crashed." });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
