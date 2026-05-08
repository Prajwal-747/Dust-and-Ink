async function askAI() {
  const response = await fetch("/ask-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "Tell me a joke about programmers.",
    }),
  });
  const data = await response.json();
  document.getElementById("answer").textContent = data.reply;
}

async function getInfo() {
  const response = await fetch(
    "https://loc.gov/pictures/search/?q=city&fo=json&sp=" +
      Math.floor(Math.random() * 100),
  );
  const data = await response.json();
  const results = data.results;
  let ran = Math.floor(Math.random() * results.length);
  const result = results[ran];
  const imgURL = result.image.full;
  const title = result.title;
  const created_date = result.created_published_date;
  document.getElementById("img-put-here").src = imgURL;
  document.getElementById("info").innerHTML =
    `<h2>${title}</h2><p>${created_date}</p>`;
}
getInfo();
