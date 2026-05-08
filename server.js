import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/ask-ai", async (req, res) => {
  try {
    const response = await fetch("https://ai.hackclub.com/proxy/v1/responses", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.apiKey}`,

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "qwen/qwen3-32b",

        input: [
          {
            type: "message",

            role: "user",

            content: [
              {
                type: "input_text",

                text: req.body.prompt,
              },
            ],
          },
        ],

        max_output_tokens: 1000,
      }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    const aiText = data.output[0].content[0].text;
    res.json({
      reply: aiText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI Request Failed",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
