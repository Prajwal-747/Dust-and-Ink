async function generatePostcard() {
  const response = await fetch(
    "https://loc.gov/pictures/search/?q=city&fo=json&sp=" +
      Math.floor(Math.random() * 100),
  );
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const item = data.results[randomIndex];
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
  - imply lost routines, old conversations, passing weather, silence and changing streets
  - sound human and cinematic
  - avoid sounding like an AI Assistant
  - avoid bullet points
  - avoid directly describing the image mechanically
  
  The postcard should feel like a real message written decades ago by someone who briefly passed through this place.
  
  Keep it between 80 to 140 words
  `;
  const aiData = askAI(prompt);
  document.getElementById("postcard-text").textContent = aiData.reply;
}

async function askAI(prompt) {
  const response = await fetch("/ask-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
  const data = await response.json();
  return data
}

generatePostcard();