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

function getData() {
  const userInput = document.getElementById("search-input");
}
