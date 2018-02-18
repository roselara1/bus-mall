'use strict';

// array to store all picture instances
var allPictures = [];
//var for selections (clicks)
var selections = 0;

//get the ul to display the results statements
var olEl = document.getElementById('results');

//arrays to store picture names and votes
var chartData = [];

var trackVotes = [];

var currentPictures = [0, 1, 2];
var newPictures = [];

// make a constructor for picture images

function Picture(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.shown = 0;
  this.votes = 0;
  allPictures.push(this);
  chartData.push(this.name);
}
function display() {
  if (localStorage.pictures) {
    allPictures = JSON.parse(localStorage.getItem('pictures'));
    for(var i in allPictures) {
      chartData[i] = allPictures[i].name;
    }
  } else{
    // push images into constructor Picture
    new Picture('Bag', 'images/bag.jpg');
    new Picture('Banana', 'images/banana.jpg');
    new Picture('Bathroom', 'images/bathroom.jpg');
    new Picture('Boots', 'images/boots.jpg');
    new Picture('Breakfast', 'images/breakfast.jpg');
    new Picture('Bubblegum', 'images/bubblegum.jpg');
    new Picture('Chair', 'images/chair.jpg');
    new Picture('Cthulhu', 'images/cthulhu.jpg');
    new Picture('Dog-duck', 'images/dog-duck.jpg');
    new Picture('Dragon', 'images/dragon.jpg');
    new Picture('Pen', 'images/pen.jpg');
    new Picture('Pet-sweep', 'images/pet-sweep.jpg');
    new Picture('Tauntaun', 'images/tauntaun.jpg');
    new Picture('Unicorn', 'images/unicorn.jpg');
    new Picture('USB', 'images/usb.gif');
    new Picture('Water-can', 'images/water-can.jpg');
    new Picture('Wine-glass', 'images/wine-glass.jpg');
  }
}


// link images to HTML

var imgEl1 = document.getElementById('firstImage');
var imgEl2 = document.getElementById('secondImage');
var imgEl3 = document.getElementById('thirdImage');

// event listeners
imgEl1.addEventListener('click', clickImg1);
imgEl2.addEventListener('click', clickImg2);
imgEl3.addEventListener('click', clickImg3);


function clickImg1() {
  randomGen();
  selections = selections + 1;
  allPictures[currentPictures[0]].votes++;
  console.log(randomGen);
  randomPicture();
}

function clickImg2() {
  randomGen();
  selections = selections + 1;
  allPictures[currentPictures[1]].votes++;
  console.log(randomGen);
  randomPicture();
}

function clickImg3() {
  randomGen();
  selections = selections + 1;
  allPictures[currentPictures[2]].votes++;
  console.log(randomGen);
  randomPicture();
}

function showResults () {
  var totalVotesChart = document.getElementById('totalVotesChart');
  var listElement = document.createElement('ol');
  for(var i in allPictures) {
    var olEl = document.createElement('li');
    olEl.textContent = allPictures[i].name + ' was viewed ' + allPictures[i].shown + ' times, and was clicked ' + allPictures[i].votes;
    listElement.appendChild(olEl);
    totalVotesChart.appendChild(olEl);
  }
}

var showVotes = function() {
  for(var i in allPictures){
    trackVotes[i] = allPictures[i].votes;
  }
};


//generate random image

function randomGen() {
  var randomImage = Math.floor(Math.random() * allPictures.length);
  return randomImage;
}

display();

//check for localStorage data
let iCanHazVotes;

if (localStorage.getItem('iCanHazVotes')) {
  iCanHazVotes = JSON.parse(localStorage.getItem('iCanHazVotes'));
}
else {
  iCanHazVotes = [];
}

function randomPicture() {

  if(selections === 25) {
    imgEl1.removeEventListener('click', clickImg1);
    imgEl2.removeEventListener('click', clickImg2);
    imgEl3.removeEventListener('click', clickImg3);

    localStorage.pictures = JSON.stringify(allPictures);
    showVotes();
    showResults();
    displayChart();
    localStorage.setItem('iCanHazVotes', JSON.stringify(trackVotes));
  }
  else {

    //ensure images do not repeat
    console.log(currentPictures);
    for (var i=0; i<3; i++) {
      var rand = randomGen();
      if (currentPictures.includes(rand) === true || newPictures.includes(rand) === true) {
        rand = randomGen();
        i--;
      }
      else {
        newPictures[i] = rand;
        allPictures[rand].shown++;
      }
    }

    currentPictures = newPictures;
    console.log(newPictures);

    imgEl1.src = allPictures[currentPictures[0]].filepath;
    imgEl2.src = allPictures[currentPictures[1]].filepath;
    imgEl3.src = allPictures[currentPictures[2]].filepath;
  }
}

//function for chart

function displayChart(){
  var ctx = document.getElementById('displayChart').getContext('2d');

  var barColors = ['#F33434', '#7BC209', '#07B0A2', '#6C0791', '#CA062D', '#500FF5', '#F7F307', '#F79707', '#FB0307', '#03FB6A', '#ACFB03', '#3FFDDD', '#FD3FA1', '#FD8E3F', '#7B59E2', '#F7EA30', '#3093F7'];

  var resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData,
      datasets: [{
        label: 'Votes per Image',
        data: trackVotes,
        backgroundColor: barColors,
        borderColor: [
          'rgb(255, 255, 255)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            stepSize: 1,
          }
        }]
      }
    }
  });
  return resultsChart;
}
showResults();
randomPicture();