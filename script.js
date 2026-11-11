const userInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const output = document.getElementById("output");
const swatiOutput = document.getElementById("swati-output");

const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error");

/*const enParts = ["Head", "Shoulders", "Knees", "Toes"];
const parts = [
  { part: "Inhloko", pronunciation: "in-hclo-koh" },
  { part: "Emahlombe", pronunciation: "emma-hclo-m+bay" },
  { part: "Emadvolo", pronunciation: "emma-d+vo-low" },
  { part: "Tintwane", pronunciation: "t+in-ntd+wa-ne" },
];*/

async function findTranslation(word) {
  try {
    const response = await fetch("database.json");
    const database = await response.json();

    const formattedWord =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); //so a match is found regardless of how the user chooses to input the word (capitalized first letter or small first letter)

    let translationData = database[0].months.find((mon) => mon[formattedWord]);

    if (translationData) {
      const data = translationData[formattedWord];
      swatiOutput.innerHTML = `<h2>${data.swa}</h2><p><em>(${data.Pronunciation})</em></p></br><p>${data.origin || ""}</p>`;
    } else {
      swatiOutput.innerHTML = "<p> No siSwati translation found.</p>";
    }
  } catch (error) {
    console.error("Error fetching or parsing database:", error);
  }
}

button.addEventListener("click", () => {
  const word = userInput.value.trim();
  if (word) {
    getDefinition(word);
  }
});

async function getDefinition(word) {
  loadingMessage.style.display = "block"; //make the loading message visible to the user so they know that their request is being processed
  errorMessage.innerText = "";
  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/en/${word}`,
    ); //sends the HTTP request to the free dictionary API

    if (!response.ok) {
      throw new Error("Requested word not found. Try another word!"); //conditional returns an error if the requested word is not found
    }
    const data = await response.json();
    const wordName = data.word;
    const firstEntry = data.entries[0];
    const partOfSpeech = firstEntry.partOfSpeech;
    const definition = firstEntry.senses[0].definition; //extracts the data of the requested word as defined by the api and stores it in variables

    output.innerHTML = `<h2>${wordName}</h2>
<p><em>(${partOfSpeech})</em></p><br>
<p>${definition}</p>`;
  } catch (err) {
    //generated new HTML to display the fetched data to the end user
    errorMessage.innerText = err.message;
  } finally {
    loadingMessage.style.display = "none"; //when the word and definition can be displayed to the user, the loading message is then hidden
  }

  findTranslation(word);
}

function showDays(day) {
  for (let i = 0; i < days.length; i++) {
    setTimeout(() => {
      let dayEnglish = enDays[i];
      day = days[i].day;
      let pronunciation = days[i].pronunciation;
      let origin = days[i].origin;

      output.innerText = dayEnglish;
      swatiOutput.innerHTML = `<b>${day}</b></br><i>${pronunciation}</i></br></br><p><small>${origin}</small></p>`;
    }, i * 3000);
    //the loop works fine but the inner text only displays the last day of the week (manipulate loop properly so it shows all the days, one after the other)
  }
}
function showNumbers(number) {
  for (let i = 0; i < numbers.length; i++) {
    setTimeout(() => {
      let numberEnglish = enNumbers[i];
      number = numbers[i].number;
      let pronunciation = numbers[i].pronunciation;
      let origin = numbers[i].origin;

      output.innerText = numberEnglish;
      swatiOutput.innerHTML = `<b>${number}</b></br><i>${pronunciation}</i></br></br><p><small>${origin}</small></p>`;
    }, i * 3000);
  }
}
function showMonths(month) {
  for (let i = 0; i < months.length; i++) {
    setTimeout(() => {
      let monthEnglish = enMonths[i];
      month = months[i].month;
      let pronunciation = months[i].pronunciation;
      let origin = months[i].origin;

      output.innerText = monthEnglish;
      swatiOutput.innerHTML = `<b>${month}</b></br><i>${pronunciation}</i></br></br><p><small>${origin}</small></p>`;
    }, i * 3000);
  }
}

function showParts(part) {
  for (let i = 0; i < parts.length; i++) {
    setTimeout(() => {
      let partsEnglish = enParts[i];
      part = parts[i].part;
      let pronunciation = parts[i].pronunciation;

      output.innerText = partsEnglish;
      swatiOutput.innerHTML = `<b>${part}</b></br><i>${pronunciation}</i>`;
    }, i * 3000);
  }
}
