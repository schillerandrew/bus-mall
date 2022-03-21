'use strict';

let productArray = [];

let numberOfVotingRounds = 5;
// ^ change to 25 later! ^

// DOM references
let imagesDiv = document.getElementById('images');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

let buttonSeeYourResults = document.getElementById('results-button');
let listYourResults = document.getElementById('results-list');

// constructor
function Product(name, filenameExtension = 'jpg') {
  this.productName = name;
  this.imagePath = `img/${name}.${filenameExtension}`;
  this.numberOfProductViews = 0;
  this.numberOfProductVotes= 0;
  

  productArray.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function randomIndexFromProductArray() {
  return Math.floor ( Math.random() * productArray.length );
}

function renderThreeImages() {
  let productIndex1 = randomIndexFromProductArray();
  let productIndex2 = randomIndexFromProductArray();
  let productIndex3 = randomIndexFromProductArray();

  while (productIndex1 === productIndex2 || productIndex1 === productIndex3) {
    productIndex1 = randomIndexFromProductArray();
  }

  while (productIndex2 === productIndex1 || productIndex2 === [productIndex3]) {
    productIndex2 = randomIndexFromProductArray();
  }

  while (productIndex3 === productIndex1 || productIndex3 === [productIndex2]) {
    productIndex3 = randomIndexFromProductArray();
  }

  image1.src = productArray[productIndex1].imagePath;
  image1.atl = productArray[productIndex1].productName;
  productArray[productIndex1].numberOfProductViews++;

  image2.src = productArray[productIndex2].imagePath;
  image2.atl = productArray[productIndex2].productName;
  productArray[productIndex2].numberOfProductViews++;

  image3.src = productArray[productIndex3].imagePath;
  image3.atl = productArray[productIndex3].productName;
  productArray[productIndex3].numberOfProductViews++;
}

renderThreeImages();
