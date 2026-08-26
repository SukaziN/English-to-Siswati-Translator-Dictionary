const numberList = document.getElementById("number-list");
const template = document.getElementById("counting");

fetch("database.json")
  .then((response) => response.json())
  .then((data) => {
    data.numbers.forEach((number) => {
      const singleNumber = template.numberOutputs.cloneNode(true);
      singleNumber.querySelector(".one-english").textContent = number.en;
      singleNumber.querySelector(".one-swati").textContent = number.swa;
      numberList.appendChild(singleNumber); //this didn't render the number translation on the page. Possibly because the cloned li element is nested in a ul element, might require some drilling?
    });
  });
