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

  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/en/${word}`,
    ); //sends the HTTP request to the free dictionary API

    if (!response.ok) {
      throw new Error("Requested word not found. Try another word!"); //conditional returns an error if the requested word is not found
    }
    const data = await response.json();
    const targetData = data[0];
    const partOfSpeech = targetData.meanings[0].partOfSpeech;
    const definition = targetData.meanings[0].definitions[0].definition; //extracts the data of the requested word as defined by the api and stores it in variables

    output.innerHTML = `<h2>${targetData.hello}</h2>
<p><em>(${partOfSpeech})</em></p>
<p>${definition}</p>`;
  } catch (err) {
    //generated new HTML to display the fetched data to the end user
    errorMessage.innerText = err.message;
  } finally {
    loadingMessage.style.display = "none"; //when the word and definition can be displayed to the user, the loading message is then hidden
  }
}

/*function getData() {
  const userInput = document.getElementById("search-input");
  const translate = userInput.value + " : ";
  switch (userInput.value) {
    case "one":
    case "1":
      output.textContent = translate.concat(numbers[0]);
      break;
    case "two":
    case "2":
      output.textContent = translate.concat(numbers[1]);
      break;
    case "three":
    case "3":
      output.textContent = translate.concat(numbers[2]);
      break;
    case "four":
    case "4":
      output.textContent = translate.concat(numbers[3]);
      break;
    case "five":
    case "5":
      output.textContent = translate.concat(numbers[4]);
      break;
    case "six":
    case "6":
      output.textContent = translate.concat(numbers[5]);
      break;
    case "seven":
    case "7":
      output.textContent = translate.concat(numbers[6]);
      break;
    case "eight":
    case "8":
      output.textContent = translate.concat(numbers[7]);
      break;
    case "nine":
    case "9":
      output.textContent = translate.concat(numbers[8]);
      break;
    case "ten":
    case "10":
      output.textContent = translate.concat(numbers[9]);
      break;

    case "January":
    case "january":
    case "jan":
      output.textContent = translate.concat(months[0]);
      break;

    case "February":
    case "february":
    case "feb":
      output.textContent = translate.concat(months[1]);
      break;
    case "March":
    case "march":
    case "mar":
      output.textContent = translate.concat(months[2]);
      break;
    case "April":
    case "april":
    case "apr":
      output.textContent = translate.concat(months[3]);
      break;
    case "May":
    case "may":
      output.textContent = translate.concat(months[4]);
      break;
    case "June":
    case "june":
    case "jun":
      output.textContent = translate.concat(months[5]);
      break;
    case "July":
    case "july":
    case "jul":
      output.textContent = translate.concat(months[6]);
      break;
    case "August":
    case "august":
    case "aug":
      output.textContent = translate.concat(months[7]);
      break;
    case "September":
    case "september":
    case "sept":
      output.textContent = translate.concat(months[8]);
      break;
    case "October":
    case "october":
    case "oct":
      output.textContent = translate.concat(months[9]);
      break;
    case "November":
    case "november":
    case "nov":
      output.textContent = translate.concat(months[10]);
      break;
    case "December":
    case "december":
    case "dec":
      output.textContent = translate.concat(months[11]);
      break;

    default:
      output.textContent = translate.concat(
        " is not a valid input! Please enter a number between 1 and 10 or a month of the year in English.",
      );
      break;
  }
}
button.addEventListener("click", getData);*/

/*function getMonths() {
  const userInput = document.getElementById("search-input");
  const translate = userInput.value + " : ";
  switch (userInput.value) {
    default:
      monthsList.textContent = translate.concat(
        " is not a valid month! Please fix any typos and search again.",
      );
  }
}
button.addEventListener("click", getMonths);*/
