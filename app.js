'use strict';

let productArray = [];

let numberOfVotingRounds = 25;

// DOM references
let imagesDiv = document.getElementById('images');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');

// let resultsSection = document.getElementById('results');
let ctx = document.getElementById('chartOfProducts');
// let buttonSeeYourResults = document.getElementById('results-button');
// let listOfResults = document.getElementById('results-list');

// GET storage
let retrievedProducts = localStorage.getItem('products');

// PARSE storage
let parsedProducts = JSON.parse(retrievedProducts);

console.log(parsedProducts);

// constructor
function Product(name, filenameExtension = 'jpg') {
  this.productName = name;
  this.imagePath = `img/${name}.${filenameExtension}`;
  this.numberOfProductViews = 0;
  this.numberOfProductVotes = 0;

  productArray.push(this);
}

if (retrievedProducts) {
  productArray = parsedProducts;
} else {
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
}

function randomIndexFromProductArray() {
  return Math.floor(Math.random() * productArray.length);
}

let thisArrayPreventsDuplicates = [];

function renderThreeImages() {

  while (thisArrayPreventsDuplicates.length < 6) {
    let randomNum = randomIndexFromProductArray();
    if (!thisArrayPreventsDuplicates.includes(randomNum)) {
      thisArrayPreventsDuplicates.unshift(randomNum);
    }
  }

  let productIndex1 = thisArrayPreventsDuplicates.pop();
  let productIndex2 = thisArrayPreventsDuplicates.pop();
  let productIndex3 = thisArrayPreventsDuplicates.pop();

  image1.src = productArray[productIndex1].imagePath;
  image1.alt = productArray[productIndex1].productName;
  productArray[productIndex1].numberOfProductViews++;

  image2.src = productArray[productIndex2].imagePath;
  image2.alt = productArray[productIndex2].productName;
  productArray[productIndex2].numberOfProductViews++;

  image3.src = productArray[productIndex3].imagePath;
  image3.alt = productArray[productIndex3].productName;
  productArray[productIndex3].numberOfProductViews++;
}

renderThreeImages();

function renderChart() {
  let productNames = [];

  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].productName);
    productViews.push(productArray[i].numberOfProductViews);
    productVotes.push(productArray[i].numberOfProductVotes);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'purple'
        ],
        borderColor: [
          'purple'
        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 50
            }
          }
        }
      }
    }
  };
  const chartOfProductViewsAndVotes = new Chart(ctx, chartObject);
}



// event handlers

function handleImageClick(event) {
  let imageClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (imageClicked === productArray[i].productName) {
      productArray[i].numberOfProductVotes++;
    }
  }

  numberOfVotingRounds--;
  if (numberOfVotingRounds === 0) {
    imagesDiv.removeEventListener('click', handleImageClick);
    renderChart();

    // STRINGIFY array
    let stringifiedProducts = JSON.stringify(productArray);

    // SET array as storage
    localStorage.setItem('products', stringifiedProducts);

    return;
    // buttonSeeYourResults.textContent = 'View Results!';
    // resultsSection.appendChild(buttonSeeYourResults);
  }
  renderThreeImages();
}

// function handleRenderResults() {
//   if (numberOfVotingRounds === 0) {
//     for (let i = 0; i < productArray.length; i++){
//       let liTag = document.createElement('li');

//       liTag.textContent = `${productArray[i].productName} was viewed ${productArray[i].numberOfProductViews} times and clicked on ${productArray[i].numberOfProductVotes} times.`;
//       listOfResults.appendChild(liTag);
//     }
//   }
//   buttonSeeYourResults.removeEventListener('click', handleRenderResults);
// }

// event listeners
imagesDiv.addEventListener('click', handleImageClick);
// buttonSeeYourResults.addEventListener('click', handleRenderResults);
