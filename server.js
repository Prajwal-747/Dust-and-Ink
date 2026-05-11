import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/ask-ai", async (req, res) => {
  try {
    console.log("REQUEST RECEIVED");

    console.log(req.body);

    const response = await fetch("https://ai.hackclub.com/proxy/v1/responses", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.apiKey}`,
        "Content-Type": "application/json",

        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
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

    console.log("FETCH RESPONSE:");
    console.log(response);

    const data = await response.json();

    console.log("FULL AI DATA:");
    console.log(data);

    const messageOutput = data.output.find((item) => item.type === "message");

    console.log("MESSAGE OUTPUT:");
    console.log(messageOutput);

    if (!messageOutput) {
      console.log("NO MESSAGE OUTPUT FOUND");

      return res.status(500).json({
        error: "No AI message returned",
      });
    }

    const aiText = messageOutput.content[0].text;

    console.log("FINAL AI TEXT:");
    console.log(aiText);

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

app.get("/random-postcard", async (req, res) => {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;

    console.log("RANDOM PAGE:");
    console.log(randomPage);

    const response = await fetch(
      `https://wwwloc.gov/pictures/search/?q=city&fo=json&sp=${randomPage}`,
    );

    console.log(response.url);
    console.log(response.status);

    const data = await response.json();

    console.log("LOC DATA RECEIVED");

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "LOC fetch failed",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
