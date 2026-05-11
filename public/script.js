console.log("SCRIPT LOADED");

async function generatePostcard() {
  console.log("START GENERATING");

  const response = await fetch("/random-postcard");

  console.log("LOC RESPONSE:");
  console.log(response);

  const data = await response.json();

  console.log("LOC DATA:");
  console.log(data);

  const randomIndex = Math.floor(Math.random() * data.results.length);

  console.log("RANDOM INDEX:");
  console.log(randomIndex);

  const item = data.results[randomIndex];

  console.log("SELECTED ITEM:");
  console.log(item);

  document.getElementById("img-put-here").src = item.image.full;

  const styles = [
    "a traveler in 1910",
    "a lonely train passenger",
    "an old diary entry",
    "a fading memory",
    "a sailor writing home",
    "someone returning after many years",
    "a person watching a city slowly change",
    "a forgotten letter never sent",
    "a quiet observer sitting near a rainy window",
    "an exhausted journalist in the 1920s",
  ];

  const randomStyle = styles[Math.floor(Math.random() * styles.length)];

  console.log("RANDOM STYLE:");
  console.log(randomStyle);

  const prompt = `
You are writing a poetic vintage postcard inspired by a historical photograph from the Library of Congress.

Photograph Title:
${item.title}

Published:
${item.created_published_date}

Subjects:
${item.subjects}

Write in the style of:
${randomStyle}

The writing should:
- feel nostalgic and emotionally immersive
- evoke forgotten history and fading memory
- imply lost routines, old conversations,
  passing weather, silence and changing streets
- sound human and cinematic
- avoid sounding like an AI assistant
- avoid bullet points
- avoid directly describing the image mechanically
- Do not use markdown formatting, asterisks, or bullet points.
- Use restraint.
- Avoid excessive poetic density.
- Allow moments of simplicity and silence.

The postcard should feel like a real message written decades ago by someone who briefly passed through this place.

Keep it between 80 to 140 words.
`;

  console.log("PROMPT:");
  console.log(prompt);

  const aiData = await askAI(prompt);

  console.log("AI DATA:");
  console.log(aiData);

  const postcardText = document.getElementById("postcard-text");

  console.log("POSTCARD ELEMENT:");
  console.log(postcardText);

  postcardText.textContent = aiData.reply;

  console.log("TEXT INSERTED");
}

async function askAI(prompt) {
  console.log("ASKING AI");

  const response = await fetch("/ask-ai", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prompt: prompt,
    }),
  });

  console.log("AI FETCH RESPONSE:");
  console.log(response);

  const data = await response.json();

  console.log("AI JSON:");
  console.log(data);

  return data;
}

generatePostcard();
