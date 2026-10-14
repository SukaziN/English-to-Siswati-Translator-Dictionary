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
    origin: "Named after the pointer finger",
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
/*const months = [
  {
    month: "Bhimbidvwane",
    pronunciation: "beem-bee-d+v+wan-eh",
    origin: "The month to eat a lot due to abundance of food",
  },
  {
    month: "Indlovana",
    pronunciation: "in-d+low-v+anna",
    origin: "Signifies a time where elephants are born ",
  },
  {
    month: "Indlovu lenkhulu",
    pronunciation: "in-d+low+voo_le-n+koo-loo",
    origin: "Elephants are fully grown at this time",
  },
  {
    month: "Mabasa",
    pronunciation: "mah-bah-sah",
    origin: "Autumn sets in. It is cold and there is need for domestic fire",
  },
  {
    month: "Inkhwekhweti",
    pronunciation: "ink-wheh-k+wheh-t+ee",
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
    origin: "Signifies endings that bring contentment",
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
];*/
const enParts = ["Head", "Shoulders", "Knees", "Toes"];
const parts = [
  { part: "Inhloko", pronunciation: "in-hclo-koh" },
  { part: "Emahlombe", pronunciation: "emma-hclo-m+bay" },
  { part: "Emadvolo", pronunciation: "emma-d+vo-low" },
  { part: "Tintwane", pronunciation: "t+in-ntd+wa-ne" },
];

async function findTranslation(word) {
  try {
    const response = await fetch("database.json");
    const database = await response.json();
    const translation = database[1].months.find((mon) => mon.en === word);

    if (translation) {
      console.log("Translation found:", translation.swa);
      //return translation;
      swatiOutput.innerHTML = `<h2>${months[0].month}</h2>
<p><em>(${months[0].pronunciation})</em></p><br>
<p>${months[0].origin}</p>`;
    } else {
      console.log("Translation not found.");
    }
  } catch (error) {
    console.error("Error fetching database:", error);
  }
}
//findTranslation("February");

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
  /*switch (word) {
    case "one":
    case "1":
      swatiOutput.innerHTML = `<b>${numbers[0].number}</b></br><i>${numbers[0].pronunciation}</i>`;
      break;
    case "two":
    case "2":
      swatiOutput.innerHTML = `<b>${numbers[1].number}</b></br><i>${numbers[1].pronunciation}</i>`;
      break;
    case "three":
    case "3":
      swatiOutput.innerHTML = `<b>${numbers[2].number}</b></br><i>${numbers[2].pronunciation}</i>`;
      break;
    case "four":
    case "4":
      swatiOutput.innerHTML = `<b>${numbers[3].number}</b></br><i>${numbers[3].pronunciation}</i>`;
      break;
    case "five":
    case "5":
      swatiOutput.innerHTML = `<b>${numbers[4].number}</b></br><i>${numbers[4].pronunciation}</i>`;
      break;
    case "six":
    case "6":
      swatiOutput.innerHTML = `<b>${numbers[5].number}</b></br><i>${numbers[5].pronunciation}</i>`;
      break;
    case "seven":
    case "7":
      swatiOutput.innerHTML = `<b>${numbers[6].number}</b></br><i>${numbers[6].pronunciation}</i></br></br><p><small>${numbers[6].origin}</small></p>`;
      break;
    case "eight":
    case "8":
      swatiOutput.innerHTML = `<b>${numbers[7].number}</b></br><i>${numbers[7].pronunciation}</i>`;
      break;
    case "nine":
    case "9":
      swatiOutput.innerHTML = `<b>${numbers[8].number}</b></br><i>${numbers[8].pronunciation}</i></br></br><p><small>${numbers[8].origin}</small></p>`;
      break;
    case "ten":
    case "10":
      swatiOutput.innerHTML = `<b>${numbers[9].number}</b></br><i>${numbers[9].pronunciation}</i>`;
      break;

    case "January":
    case "january":
    case "jan":
      swatiOutput.innerHTML = `<b>${months[0].month}</b></br><i>${months[0].pronunciation}</i></br></br><p><small>${months[0].origin}</small></p>`;
      break;

    case "February":
    case "february":
    case "feb":
      swatiOutput.innerHTML = `<b>${months[1].month}</b></br><i>${months[1].pronunciation}</i></br></br><p><small>${months[1].origin}</small></p>`;
      break;
    case "March":
    case "march":
    case "mar":
      swatiOutput.innerHTML = `<b>${months[2].month}</b></br><i>${months[2].pronunciation}</i></br></br><p><small>${months[2].origin}</small></p>`;
      break;
    case "April":
    case "april":
    case "apr":
      swatiOutput.innerHTML = `<b>${months[3].month}</b></br><i>${months[3].pronunciation}</i></br></br><p><small>${months[3].origin}</small></p>`;
      break;
    case "May":
    case "may":
      swatiOutput.innerHTML = `<b>${months[4].month}</b></br><i>${months[4].pronunciation}</i></br></br><p><small>${months[4].origin}</small></p>`;
      break;
    case "June":
    case "june":
    case "jun":
      swatiOutput.innerHTML = `<b>${months[5].month}</b></br><i>${months[5].pronunciation}</i></br></br><p><small>${months[5].origin}</small></p>`;
      break;
    case "July":
    case "july":
    case "jul":
      swatiOutput.innerHTML = `<b>${months[6].month}</b></br><i>${months[6].pronunciation}</i>`;
      break;
    case "August":
    case "august":
    case "aug":
      swatiOutput.innerHTML = `<b>${months[7].month}</b></br><i>${months[7].pronunciation}</i></br></br><p><small>${months[7].origin}</small></p>`;
      break;
    case "September":
    case "september":
    case "sept":
      swatiOutput.innerHTML = `<b>${months[8].month}</b></br><i>${months[8].pronunciation}</i></br></br><p><small>${months[8].origin}</small></p>`;
      break;
    case "October":
    case "october":
    case "oct":
      swatiOutput.innerHTML = `<b>${months[9].month}</b></br><i>${months[9].pronunciation}</i></br></br><p><small>${months[9].origin}</small></p>`;
      break;
    case "November":
    case "november":
    case "nov":
      swatiOutput.innerHTML = `<b>${months[10].month}</b></br><i>${months[10].pronunciation}</i></br></br><p><small>${months[10].origin}</small></p>`;
      break;
    case "December":
    case "december":
    case "dec":
      swatiOutput.innerHTML = `<b>${months[11].month}</b></br><i>${months[11].pronunciation}</i></br></br><p><small>${months[11].origin}</small></p>`;
      break;

    default:
      swatiOutput.textContent =
        "The SiSwati translation of " +
        "'" +
        word +
        "'" +
        " was not found in our database.";
      break;
  }*/
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
