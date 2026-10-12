/*const fileSystem = require("fs").promises;
async function findTranslation(swatiWord) {
  try {
    const dataText = await fileSystem.readFile("database.json", "utf8");
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
findTranslation("February");*/
async function findTranslation(swatiWord) {
  try {
    const response = await fetch("database.json");
    const database = await response.json();
    const translation = database.months.find((mon) => mon.en === swatiWord);

    if (translation) {
      console.log("Translation found:", translation.swa);
      return translation;
    } else {
      console.log("Translation not found.");
    }
  } catch (error) {
    console.error("Error fetching database:", error);
  }
}
findTranslation("February");

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
  { number: "Kunye", pronunciation: "kuh-n-ye" },
  { number: "Kubili", pronunciation: "kuh-biy-lee" },
  { number: "Kutsatfu", pronunciation: "kuh-t+sah-t+foo" },
  { number: "Kune", pronunciation: "kuh-ne" },
  { number: "Kuhlanu", pronunciation: "kuh-hcla-new" },
  { number: "Sitfupha", pronunciation: "sit-foo-pah" },
  {
    number: "Sikhombisa",
    pronunciation: "see-cko-m+bee-sah",
    origin: "The pointer finger",
  },
  { number: "Siphohlongo", pronunciation: "see-po-hclo-n+go" },
  {
    number: "Imfica",
    pronunciation: "e-m-fee-c+ah",
    origin: "Proximity to an end/goal",
  },
  { number: "Lishumi", pronunciation: "lee-shoo-me" },
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
  {
    day: "Umsombuluko",
    pronunciation: "oom-soh-m+boo-loo-koh",
    origin: "The resolve/ conclusive settlement",
  },
  { day: "Lesibili", pronunciation: "leh-see-biy-lee" },
  { day: "Lesitsatfu", pronunciation: "leh-see-t+sah-t+foo" },
  { day: "Lesine", pronunciation: "leh-see-ne" },
  { day: "Lesihlanu", pronunciation: "leh-see-hcla-new" },
  {
    day: "Umgcibelo",
    pronunciation: "oom-gcih-bay-low",
    origin:
      "meaning last encounter or closure. Derived from this being the designated day for burials",
  },
  { day: "Lisontfo", pronunciation: "lee-saun+t+foe", origin: "The cut-off" },
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
  {
    month: "Bhimbidvwane",
    pronunciation: "beem-bee-d+v+wan-eh",
    origin: "The month to eat a lot due to abundance of food",
  },
  {
    month: "Indlovana",
    pronunciation: "in-d+low-v+anna",
    origin: "Signifies a time where elephants are born Eswatini",
  },
  {
    month: "Indlovulenkhulu",
    pronunciation: "in-d+low+voo-le-n+koo-loo",
    origin: "Elephants are fully grown at this time",
  },
  {
    month: "Mabasa",
    pronunciation: "mah-bah-sah",
    origin: "Autumn sets in. It is cold and there is need for domestic fire",
  },
  {
    month: "Inkhwekhweti",
    pronunciation: "ink-wheh-k+whe-t+ee",
    origin: "A time for harvest",
  },
  {
    month: "Inhlaba",
    pronunciation: "in-hcla-bah",
    origin: "Aloe is thriving; soil is more on the dry side",
  },
  { month: "Kholwane", pronunciation: "coal-wan-eh" },
  {
    month: "Ingci",
    pronunciation: "in-gcih",
    origin: "Signifies an ending that brings contentment",
  },
  { month: "Inyoni", pronunciation: "in-yoni", origin: "It is bird season" },
  { month: "Imphala", pronunciation: "im-pah-lah", origin: "Springbok season" },
  {
    month: "Lweti",
    pronunciation: "l+weh-t+ee",
    origin: "Symbolic of a transitional period",
  },
  {
    month: "Ingongoni",
    pronunciation: "in+go-n+go-knee",
    origin: "Buffalo season",
  },
];
const enParts = ["Head", "Shoulders", "Knees", "Toes"];
const parts = [
  { part: "Inhloko", pronunciation: "in-hclo-koh" },
  { part: "Emahlombe", pronunciation: "emma-hclo-m+bay" },
  { part: "Emadvolo", pronunciation: "emma-d+vo-low" },
  { part: "Tintwane", pronunciation: "t+in=ntd+wa-ne" },
];

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
      swatiOutput.textContent = translate.concat(numbers[0].number);
      break;
    case "two":
    case "2":
      swatiOutput.textContent = translate.concat(numbers[1].number);
      break;
    case "three":
    case "3":
      swatiOutput.textContent = translate.concat(numbers[2].number);
      break;
    case "four":
    case "4":
      swatiOutput.textContent = translate.concat(numbers[3].number);
      break;
    case "five":
    case "5":
      swatiOutput.textContent = translate.concat(numbers[4].number);
      break;
    case "six":
    case "6":
      swatiOutput.textContent = translate.concat(numbers[5].number);
      break;
    case "seven":
    case "7":
      swatiOutput.textContent = translate.concat(numbers[6].number);
      break;
    case "eight":
    case "8":
      swatiOutput.textContent = translate.concat(numbers[7].number);
      break;
    case "nine":
    case "9":
      swatiOutput.textContent = translate.concat(numbers[8].number);
      break;
    case "ten":
    case "10":
      swatiOutput.textContent = translate.concat(numbers[9].number);
      break;

    case "January":
    case "january":
    case "jan":
      swatiOutput.textContent = translate.concat(months[0].month);
      break;

    case "February":
    case "february":
    case "feb":
      swatiOutput.textContent = translate.concat(months[1].month);
      break;
    case "March":
    case "march":
    case "mar":
      swatiOutput.textContent = translate.concat(months[2].month);
      break;
    case "April":
    case "april":
    case "apr":
      swatiOutput.textContent = translate.concat(months[3].month);
      break;
    case "May":
    case "may":
      swatiOutput.textContent = translate.concat(months[4].month);
      break;
    case "June":
    case "june":
    case "jun":
      swatiOutput.textContent = translate.concat(months[5].month);
      break;
    case "July":
    case "july":
    case "jul":
      swatiOutput.textContent = translate.concat(months[6].month);
      break;
    case "August":
    case "august":
    case "aug":
      swatiOutput.textContent = translate.concat(months[7].month);
      break;
    case "September":
    case "september":
    case "sept":
      swatiOutput.textContent = translate.concat(months[8].month);
      break;
    case "October":
    case "october":
    case "oct":
      swatiOutput.textContent = translate.concat(months[9].month);
      break;
    case "November":
    case "november":
    case "nov":
      swatiOutput.textContent = translate.concat(months[10].month);
      break;
    case "December":
    case "december":
    case "dec":
      swatiOutput.textContent = translate.concat(months[11].month);
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
      day = days[i].day;

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
      number = numbers[i].number;

      output.innerText = numberEnglish;
      swatiOutput.innerText = number;
    }, i * 3000);
  }
}
function showMonths(month) {
  for (let i = 0; i < months.length; i++) {
    setTimeout(() => {
      let monthEnglish = enMonths[i];
      month = months[i].month;

      output.innerText = monthEnglish;
      swatiOutput.innerText = month;
    }, i * 3000);
  }
}

function showParts(part) {
  for (let i = 0; i < parts.length; i++) {
    setTimeout(() => {
      let partsEnglish = enParts[i];
      part = parts[i].part;

      output.innerText = partsEnglish;
      swatiOutput.innerText = part;
    }, i * 3000);
  }
}
