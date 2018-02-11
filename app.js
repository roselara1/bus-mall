'use strict';
//array to store the objects
var allDisplayImages=[];

//store current images value array
var currentValues = [];

//make constructor function
function DisplayImage(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  allDisplayImages.push(this);
}
//use my constructor function
function pushImages () {
  new DisplayImage('Bag', 'images/bag.jpg');
  new DisplayImage('Banana', 'images/banana.jpg');
  new DisplayImage('Bathroom', 'images/bathroom.jpg');
  new DisplayImage('Boots', 'images/boots.jpg');
  new DisplayImage('Breakfast', 'images/breakfast.jpg');
  new DisplayImage('Bubblegum', 'images/bubblegum.jpg');
  new DisplayImage('Chair', 'images/chair.jpg');
  new DisplayImage('Cthulhu', 'images/cthulhu.jpg');
  new DisplayImage('Dog-duck', 'images/dog-duck.jpg');
  new DisplayImage('Dragon', 'images/dragon.jpg');
  new DisplayImage('Pen', 'images/pen.jpg');
  new DisplayImage('Pet-sweep', 'images/pet-sweep.jpg');
  new DisplayImage('Tauntaun', 'images/tauntaun.jpg');
  new DisplayImage('Unicorn', 'images/unicorn.jpg');
  new DisplayImage('USB', 'images/usb.gif');
  new DisplayImage('Water-can', 'images/water-can.jpg');
  new DisplayImage('Wine-glass', 'images/wine-glass.jpg');
}
pushImages();

//listen for clicks
firstImage.addEventListener('click', randomImage);
secondImage.addEventListener('click', randomImage);
thirdImage.addEventListener('click', randomImage);

//track clicks
// function clickTracker() {
//     for (var c = o; c < allDisplayImages.length; c++) {
//         if (event.target === allDisplayImages[c].name)
//         allDisplayImages[c].clicks++;
//     }
// }

//randomly display one of the pictures
function randomImage() {
  var firstImage = document.getElementById('firstImage');



  var randomArray1 = Math.floor(Math.random() * allDisplayImages.length);
  console.log(randomArray1);

  firstImage.src = allDisplayImages[randomArray1].filepath;
  console.log(firstImage.src);
  currentValues.push(firstImage);

  var secondImage = document.getElementById('secondImage');
  while (firstImage === secondImage) {
    secondImage = randomArray2();
  }


  var randomArray2 = Math.floor(Math.random() * allDisplayImages.length);
  console.log(randomArray2);

  secondImage.src = allDisplayImages[randomArray2].filepath;
  console.log(secondImage.src);
  currentValues.push(secondImage);

  var thirdImage = document.getElementById('thirdImage');
  while (firstImage === thirdImage || secondImage === thirdImage) {
    thirdImage = randomArray3;
  }


  var randomArray3 = Math.floor(Math.random() * allDisplayImages.length);
  console.log(randomArray3);
  thirdImage.src = allDisplayImages[randomArray3].filepath;
  console.log(thirdImage.src);
  currentValues.push(thirdImage);

  // if (firstImage === secondImage || firstImage === thirdImage || secondImage === thirdImage )
  // console.log('Same image in row')
  // firstImage = randomArray1;
  // secondImage = randomArray2;
  // thirdImage =

  //stop clicks
  function stopListening () {
    firstImage.removeEventListener('click', randomImage);
    secondImage.removeEventListener('click', randomImage);
    thirdImage.removeEventListener('click', randomImage);
  }
}

//stop the ability to click
var clicks = 0;
function preventClicks() {
  if (clicks === 25) {
    stopListening();
    render (results);
  }
  else {clicks++;
  }
}
preventClicks();




randomImage();

