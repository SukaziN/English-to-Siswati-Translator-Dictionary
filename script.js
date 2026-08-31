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

const button = document.getElementById("search-button");

const numberList = document.getElementById("number-list");
const monthsList = document.getElementById("month-list");

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

function getNumbers() {
  const userInput = document.getElementById("search-input");
  const translate = userInput.value + " : ";
  switch (userInput.value) {
    case "one":
    case "1":
      numberList.textContent = translate.concat(numbers[0]);
      break;
    case "two":
    case "2":
      numberList.textContent = translate.concat(numbers[1]);
      break;
    case "three":
    case "3":
      numberList.textContent = translate.concat(numbers[2]);
      break;
    case "four":
    case "4":
      numberList.textContent = translate.concat(numbers[3]);
      break;
    case "five":
    case "5":
      numberList.textContent = translate.concat(numbers[4]);
      break;
    case "six":
    case "6":
      numberList.textContent = translate.concat(numbers[5]);
      break;
    case "seven":
    case "7":
      numberList.textContent = translate.concat(numbers[6]);
      break;
    case "eight":
    case "8":
      numberList.textContent = translate.concat(numbers[7]);
      break;
    case "nine":
    case "9":
      numberList.textContent = translate.concat(numbers[8]);
      break;
    case "ten":
    case "10":
      numberList.textContent = translate.concat(numbers[9]);
      break;
    default:
      numberList.textContent = translate.concat(
        " is not a valid number! Please enter a number between 1 and 10.",
      );
      break;
  }
}
button.addEventListener("click", getNumbers);

/*function getMonths() {
  const userInput = document.getElementById("search-input");
  const translate = userInput.value + " : ";
  switch (userInput.value) {
    case "January":
    case "january":
    case "jan":
      monthsList.textContent = translate.concat(numbers[0]);
      break;

    case "February":
    case "february":
    case "feb":
      monthsList.textContent = translate.concat(numbers[1]);
      break;
    case "March":
    case "march":
    case "mar":
      monthsList.textContent = translate.concat(numbers[2]);
      break;
    case "April":
    case "april":
    case "apr":
      monthsList.textContent = translate.concat(numbers[3]);
      break;
    case "May":
    case "may":
      monthsList.textContent = translate.concat(numbers[4]);
      break;
    case "June":
    case "june":
    case "jun":
      monthsList.textContent = translate.concat(numbers[5]);
      break;
    case "July":
    case "july":
    case "jul":
      monthsList.textContent = translate.concat(numbers[6]);
      break;
    case "August":
    case "august":
    case "aug":
      monthsList.textContent = translate.concat(numbers[7]);
      break;
    case "September":
    case "september":
    case "sept":
      monthsList.textContent = translate.concat(numbers[8]);
      break;
    case "October":
    case "october":
    case "oct":
      monthsList.textContent = translate.concat(numbers[9]);
      break;
    case "November":
    case "november":
    case "nov":
      monthsList.textContent = translate.concat(numbers[10]);
      break;
    case "December":
    case "december":
    case "dec":
      monthsList.textContent = translate.concat(numbers[11]);
      break;
    default:
      numberList.textContent = translate.concat(
        " is not a valid month! Please fix any typos and search again.",
      );
  }
}
button.addEventListener("click", getMonths);*/
