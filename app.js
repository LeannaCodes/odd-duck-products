const allProducts = [];
const productNames = ['bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'water-can',
    'wine-glass'
];

function Product(nameArg, fileArg) {
    this.name = nameArg;
    this.file = fileArg;
    this.clicked = 0;
}

for (let a = 0; a < productNames.length; a++) {
    const myNewProduct = new Product(productNames[a],"img/" + '.jpg');
    allProducts.push(myNewProduct);
}

Product.prototype.render = function() {

}

