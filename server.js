import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/random-postcard", async (req, res) => {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;

    console.log("RANDOM PAGE:");
    console.log(randomPage);

    const response = await fetch(
      `https://www.loc.gov/pictures/search/?q=city&fo=json&sp=${randomPage}`,
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
