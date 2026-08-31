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
      numberList.textContent = translate.concat(numbers[0]);
      break;
    case "two":
      numberList.textContent = translate.concat(numbers[1]);
      break;
    case "three":
      numberList.textContent = translate.concat(numbers[2]);
      break;
    case "four":
      numberList.textContent = translate.concat(numbers[3]);
      break;
    case "five":
      numberList.textContent = translate.concat(numbers[4]);
      break;
    case "six":
      numberList.textContent = translate.concat(numbers[5]);
      break;
    case "seven":
      numberList.textContent = translate.concat(numbers[6]);
      break;
    case "eight":
      numberList.textContent = translate.concat(numbers[7]);
      break;
    case "nine":
      numberList.textContent = translate.concat(numbers[8]);
      break;
    case "ten":
      numberList.textContent = translate.concat(numbers[9]);
      break;
  }
}
button.addEventListener("click", getNumbers);
