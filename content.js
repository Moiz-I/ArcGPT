let sleepMode = true; //or set false to get an instant response from GPT

const box = document.createElement("button");
box.style.width = "650px";
box.style.height = "50px";
box.style.background="white";
box.style.border="1px solid #dadce0";
box.style.color="#dadce0";
box.style.borderRadius="8px";
box.style.padding="15px";
box.style.fontSize="15px";
box.style.lineHeight="1.6";

const searchResults = document.getElementById("rso");
searchResults.parentNode.insertBefore(box, searchResults);
const question =document.querySelector("input[name='q']").value;

async function generateCompletion(q) {
  var response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer REPLACE_WITH_YOUR_KEY_HERE",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: q,
      max_tokens: 100,
      temperature: 0.7,
    }),
  });
  var responseJson = await response.json();
  console.log(responseJson.choices[0].text);
  return responseJson.choices[0].text;
}
async function getCompletion() {
  box.innerHTML="loading...";
  box.innerHTML= await generateCompletion(question);
  box.style.height = "";
  box.className="answer";
  //box.style.background='var(--arc-palette-foregroundTertiary, white)';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Set the background color to a dark color
    box.style.background='var(--arc-palette-focus, white)';
    box.style.border="3px solid var(--arc-palette-foregroundPrimary, #dadce0)";
    box.style.color='var(--arc-palette-foregroundPrimary, #dadce0)';
  } else {
    // Set the background color to a light color
    box.style.background='var(--arc-palette-foregroundTertiary, white)';
    box.style.border="1px solid var(--arc-palette-foregroundPrimary, #dadce0)";
    box.style.color='var(--arc-palette-title, #dadce0)';
  }
}

if (sleepMode) {
  box.innerHTML="Click here to summon GPT";
  box.onclick = function() {
    getCompletion();
  }
} else {
  getCompletion();
}


