const fileSystem = require("fs").promises;
const userInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const output = document.getElementById("output");
const swatiOutput = document.getElementById("swati-output");

const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error");

const enNumbers = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];
const numbers = [
  "Kunye",
  "Kubili",
  "Kutsatfu",
  "Kune",
  "Kuhlanu",
  "Sitfupha",
  "Sikhombisa",
  "Siphohlongo",
  "Imfica",
  "Lishumi",
];

const enDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const days = [
  "Umsombuluko",
  "Lesibili",
  "Lesitsatfu",
  "Lesine",
  "Lesihlanu",
  "Umgcibelo",
  "Lisontfo",
];

const enMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const months = [
  "Bhimbidvwane",
  "Indlovana",
  "Indlovulenkhulu",
  "Mabasa",
  "Inkhwekhweti",
  "Inhlaba",
  "Kholwane",
  "Ingci",
  "Inyoni",
  "Imphala",
  "Lweti",
  "Ingongoni",
];
const enParts = ["Head", "Shoulders", "Knees", "Toes"];
const parts = ["Inhloko", "Emahlombe", "Emadvolo", "Tintwane"];

async function findTranslation(swatiWord) {
  try {
    const dataText = await fs.readFile("database.json", "utf8");
    const database = JSON.parse(dataText);

    const translation = database.months.find((mon) => mon.en === swatiWord);

    if (translation) {
      console.log("Translation found:", translation.swa);
      return translation;
    } else {
      console.log("Translation not found.");
    }
  } catch (error) {
    console.error("Error reading database:", error);
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

  const translate = "Swati" + " : ";
  switch (word) {
    case "one":
    case "1":
      swatiOutput.textContent = translate.concat(numbers[0]);
      break;
    case "two":
    case "2":
      swatiOutput.textContent = translate.concat(numbers[1]);
      break;
    case "three":
    case "3":
      swatiOutput.textContent = translate.concat(numbers[2]);
      break;
    case "four":
    case "4":
      swatiOutput.textContent = translate.concat(numbers[3]);
      break;
    case "five":
    case "5":
      swatiOutput.textContent = translate.concat(numbers[4]);
      break;
    case "six":
    case "6":
      swatiOutput.textContent = translate.concat(numbers[5]);
      break;
    case "seven":
    case "7":
      swatiOutput.textContent = translate.concat(numbers[6]);
      break;
    case "eight":
    case "8":
      swatiOutput.textContent = translate.concat(numbers[7]);
      break;
    case "nine":
    case "9":
      swatiOutput.textContent = translate.concat(numbers[8]);
      break;
    case "ten":
    case "10":
      swatiOutput.textContent = translate.concat(numbers[9]);
      break;

    case "January":
    case "january":
    case "jan":
      swatiOutput.textContent = translate.concat(months[0]);
      break;

    case "February":
    case "february":
    case "feb":
      swatiOutput.textContent = translate.concat(months[1]);
      break;
    case "March":
    case "march":
    case "mar":
      swatiOutput.textContent = translate.concat(months[2]);
      break;
    case "April":
    case "april":
    case "apr":
      swatiOutput.textContent = translate.concat(months[3]);
      break;
    case "May":
    case "may":
      swatiOutput.textContent = translate.concat(months[4]);
      break;
    case "June":
    case "june":
    case "jun":
      swatiOutput.textContent = translate.concat(months[5]);
      break;
    case "July":
    case "july":
    case "jul":
      swatiOutput.textContent = translate.concat(months[6]);
      break;
    case "August":
    case "august":
    case "aug":
      swatiOutput.textContent = translate.concat(months[7]);
      break;
    case "September":
    case "september":
    case "sept":
      swatiOutput.textContent = translate.concat(months[8]);
      break;
    case "October":
    case "october":
    case "oct":
      swatiOutput.textContent = translate.concat(months[9]);
      break;
    case "November":
    case "november":
    case "nov":
      swatiOutput.textContent = translate.concat(months[10]);
      break;
    case "December":
    case "december":
    case "dec":
      swatiOutput.textContent = translate.concat(months[11]);
      break;

    default:
      swatiOutput.textContent = translate.concat(
        "The SiSwati translation of " +
          "'" +
          word +
          "'" +
          " was not found in our database.",
      );
      break;
  }
}

function showDays(day) {
  for (let i = 0; i < days.length; i++) {
    setTimeout(() => {
      let dayEnglish = enDays[i];
      day = days[i];

      output.innerText = dayEnglish;
      swatiOutput.innerText = day;
    }, i * 3000);
    //the loop works fine but the inner text only displays the last day of the week (manipulate loop properly so it shows all the days, one after the other)
  }
}
function showNumbers(number) {
  for (let i = 0; i < numbers.length; i++) {
    setTimeout(() => {
      let numberEnglish = enNumbers[i];
      number = numbers[i];

      output.innerText = numberEnglish;
      swatiOutput.innerText = number;
    }, i * 3000);
  }
}
function showMonths(month) {
  for (let i = 0; i < months.length; i++) {
    setTimeout(() => {
      let monthEnglish = enMonths[i];
      month = months[i];

      output.innerText = monthEnglish;
      swatiOutput.innerText = month;
    }, i * 3000);
  }
}

function showParts(part) {
  for (let i = 0; i < parts.length; i++) {
    setTimeout(() => {
      let partsEnglish = enParts[i];
      part = parts[i];

      output.innerText = partsEnglish;
      swatiOutput.innerText = part;
    }, i * 3000);
  }
}
