const template = document.getElementById("learn-siswati");

fetch("database.json")
  .then((response) => response.json())
  .then((data) => {
    data.numbers.forEach((number) => {
      const singleNumber = template.contentEditable.cloneNode(true);
    });
  });
