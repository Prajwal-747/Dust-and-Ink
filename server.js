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

    const data = await response.json();

    const messageOutput = data.output.find((item) => item.type === "message");

    if (!messageOutput) {
      return res.status(500).json({
        error: "No AI message returned",
      });
    }

    const aiText = messageOutput.content[0].text;

    res.json({
      reply: aiText,
    });
  } catch (error) {
    console.error("SERVER ERROR:");
    console.error(error);

    res.status(500).json({
      error: "AI Request Failed",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
