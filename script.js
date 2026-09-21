/*const numberList = document.getElementById("number-list");
const template = document.getElementById("counting");

fetch("database.json")
  .then((response) => response.json())
  .then((data) => {
    data.numbers.forEach((number) => {
      //const singleNumber = template.numberOutputs.cloneNode(true);
      const singleNumber = template.cloneNode("true");
      singleNumber.removeAttribute("id"); //prevents node cloning errors because an id can only be used once in html
      singleNumber.style.display = "block"; //removes the css styling making this element invisible (makes it visible)

      singleNumber.querySelector(".one-english").textContent = number.en;
      singleNumber.querySelector(".one-swati").textContent = number.swa;
      numberList.appendChild(singleNumber); //this didn't render the number translation on the page. Possibly because the cloned li element is nested in a ul element, might require some drilling?
    });
  }); //eliminate the template element completely and use a div element with display none as its styling and try again
*/
const userInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const output = document.getElementById("output");
const swatiOutput = document.getElementById("swati-output");

const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error");

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

const months = [
  "Bhimbidvwane",
  "Indlovana",
  "Indlovulenkhulu",
  "Mabasa",
  "Inhkwekhweti",
  "Inhlaba",
  "Kholwane",
  "Ingci",
  "Inyoni",
  "Imphala",
  "Lweti",
  "Ingongoni",
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
<p><em>(${partOfSpeech})</em></p>
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
