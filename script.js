const template = document.getElementById("learn-siswati");

fetch("database.json")
  .then((response) => response.json())
  .then((data) => {
    data.numbers.forEach((number) => {
      const singleNumber = template.contentEditable.cloneNode(true);
      singleNumber.querySelector(".one-english").textContent = number.en;
      singleNumber.querySelector(".one-swati").textContent = number.swa;
    });
  });
