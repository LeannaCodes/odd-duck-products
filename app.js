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
let rounds = 3;

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
}

function getThreeProducts() {
  const img1 = allProducts[randomProduct()];
  const img2 = allProducts[randomProduct()];
  const img3 = allProducts[randomProduct()];

  if (img1 === img2 || img1 === img3 || img2 === img3) {
    getThreeProducts();
  } else {
    imagesDiv.innerHTML = "";

    img1.render();
    img2.render();
    img3.render();
  }
}
getThreeProducts();
function randomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// function that populates the reuslts div with our results
function getResults() {
  const resultsList = document.getElementById("results-list");
  for (let a = 0; a < allProducts.length; a++) {
    const itemClicks = allProducts[a].clicked;
    if (itemClicks > 0) {
      //render on the DOM
      const li = document.createElement("li");
      li.textContent = `${allProducts[a].name} had ${allProducts[a].clicked} votes, and was viewed ${allProducts[a].viewed} times`; //"banana had 3 votes, and was seen 5 times."
      resultsList.appendChild(li);
    }
  }

  resultsList.classList.remove("hide");

  const button = document.getElementById("results-btn");

  button.classList.add("hide");
}
console.log(allProducts);
