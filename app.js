const allProducts = [];
const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];
let rounds = 25;
let prevRandomNumbers = [];

// get the div where we will put the images
const imagesDiv = document.getElementById("images-div");
imagesDiv.addEventListener("click", function () {
  console.log("Please click one of the images.");
});

function Product(nameArg, fileArg) {
  this.name = nameArg;
  this.file = fileArg;
  this.clicked = 0;
  this.viewed = 0;
}

// create contrustcor
Product.prototype.render = function () {
  this.viewed++;
  const theProduct = this;
  const img = document.createElement("img");
  img.setAttribute("src", this.file);
  img.setAttribute("alt", this.name);
  img.classList.add("images");
  imagesDiv.appendChild(img);

  img.addEventListener("click", function () {
    theProduct.clicked++;
    console.log(theProduct);

    if (rounds > 1) {
      // if there are still rounds to go
      rounds--;
      getThreeProducts();
    } else {
      //remove event listeners and display results
      //   getResults();
      const button = document.getElementById("results-btn");
      button.addEventListener("click", function () {
        getResults();
      });
      button.removeAttribute("hidden");
    }
  });
};

// get all of our product objects
for (let a = 0; a < productNames.length; a++) {
  const myNewProduct = new Product(
    productNames[a],
    "img/" + productNames[a] + ".jpg"
  );
  allProducts.push(myNewProduct);
} // here

function getThreeProducts() {
  let randNum1 = randomProduct();
  let randNum2 = randomProduct();
  let randNum3 = randomProduct();

  const img1 = allProducts[randNum1];
  const img2 = allProducts[randNum2];
  const img3 = allProducts[randNum3];

  if (img1 === img2 || img1 === img3 || img2 === img3) {
    getThreeProducts();
  } else {
    if (
      prevRandomNumbers.includes(randNum1) ||
      prevRandomNumbers.includes(randNum2) ||
      prevRandomNumbers.includes(randNum3)
    ) {
      getThreeProducts();
    } else {
      prevRandomNumbers = [];
      prevRandomNumbers.push(randNum1);
      prevRandomNumbers.push(randNum2);
      prevRandomNumbers.push(randNum3);

      // prevRandomNumbers = [19, 8, 14]

      imagesDiv.innerHTML = "";

      img1.render();
      img2.render();
      img3.render();
    }
  }
}
getThreeProducts();
function randomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// function that populates the reuslts div with our results
function getResults() {
  // populate results list
  const resultsList = document.getElementById("results-list");
  let tableData = [];
  let productLabels = [];
  for (let a = 0; a < allProducts.length; a++) {
    const itemClicks = allProducts[a].clicked;
    if (itemClicks > 0) {
      //render on the DOM
      const li = document.createElement("li");
      li.textContent = `${allProducts[a].name} had ${allProducts[a].clicked} votes, and was viewed ${allProducts[a].viewed} times`; //"banana had 3 votes, and was seen 5 times."
      resultsList.appendChild(li);
      // get chart data

      tableData.push(itemClicks);
      productLabels.push(allProducts[a].name);
    }
  }

  const ctx = document.getElementById("chart").getContext("2d");
  // const data = [2, 3, 4, 5, 6, 7, 8] // no. votes
  // const productLabels = ["poo", "poo", "poo", "poo", "poo", "poo", "poo"] // product names

  const chartColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: productLabels,
      datasets: [
        {
          label: "# of Votes",
          data: tableData,
          backgroundColor: chartColors,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  resultsList.classList.remove("hide");

  const button = document.getElementById("results-btn");

  button.classList.add("hide");
}
console.log(allProducts);
