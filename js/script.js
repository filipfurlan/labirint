
const points = [234, 2, 234, 10, 122, 10, 122, 26, 202, 26, 202, 42, 170, 42, 170, 106, 154, 106, 154, 154, 170, 154, 170, 138, 186, 138, 186, 170, 138, 170, 138, 202, 90, 202, 90, 234, 58, 234, 58, 250, 90, 250, 90, 266, 74, 266, 74, 330, 106, 330, 106, 362, 122, 362, 122, 378, 106, 378, 106, 394, 74, 394, 74, 410, 106, 410, 106, 426, 122, 426, 122, 410, 138, 410, 138, 426, 154, 426, 154, 394, 138, 394, 138, 378, 154, 378, 154, 362, 138, 362, 138, 346, 170, 346, 170, 394, 186, 394, 186, 298, 202, 298, 202, 314, 218, 314, 218, 330, 202, 330, 202, 346, 218, 346, 218, 362, 202, 362, 202, 378, 234, 378, 234, 362, 266, 362, 266, 410, 250, 410, 250, 394, 202, 394, 202, 426, 218, 426, 218, 442, 250, 442, 250, 426, 282, 426, 282, 442, 298, 442, 298, 474, 266, 474, 266, 458, 234, 458, 234, 474, 250, 474, 250, 482];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const podgana = document.getElementById('podgana');
const sir = document.getElementById('sir');

var je3 = false;
var je2 = false;
var je = false;
var fromStop = false;
var interval;
const x = [234, 234, 122, 122, 202, 202, 170, 170, 154, 154, 170, 170, 186, 186, 138, 138, 90, 90, 58, 58, 90, 90, 74, 74, 106, 106, 122, 122, 106, 106, 74, 74, 106, 106, 122, 122, 138, 138, 154, 154, 138, 138, 154, 154, 138, 138, 170, 170, 186, 186, 202, 202, 218, 218, 202, 202, 218, 218, 202, 202, 234, 234, 266, 266, 250, 250, 202, 202, 218, 218, 250, 250, 282, 282, 298, 298, 266, 266, 234, 234, 250, 250];
const y = [2, 10, 10, 26, 26, 42, 42, 106, 106, 154, 154, 138, 138, 170, 170, 202, 202, 234, 234, 250, 250, 266, 266, 330, 330, 362, 362, 378, 378, 394, 394, 410, 410, 426, 426, 410, 410, 426, 426, 394, 394, 378, 378, 362, 362, 346, 346, 394, 394, 298, 298, 314, 314, 330, 330, 346, 346, 362, 362, 378, 378, 362, 362, 410, 410, 394, 394, 426, 426, 442, 442, 426, 426, 442, 442, 474, 474, 458, 458, 474, 474, 482];
const gumb = document.getElementById('gumb');
const gumb2 = document.getElementById('gumb2');
const gumb3 = document.getElementById('slikamove');
var slider = document.getElementById("slider");
var food = [];

let currentX = x[0];
let currentY = y[0];
let targetX = x[1];
let targetY = y[1];
let speed = 1; //1,2,4,8
let currentIndex = 1;

function draw() {
  je = true;
  gumb.disabled = true;
  gumb2.disabled = true;
  gumb3.disabled = true;
  slider.disabled = true;
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.strokeStyle = '#f9c02e';
  ctx.moveTo(currentX, currentY);

  const rectWidth = 10;  // Adjust this to your desired width
  const rectHeight = 10; // Adjust this to your desired height

  if (currentX < targetX) {
    if (currentX + speed >= targetX) {
      currentX = targetX
    } else {
      currentX += speed;
    }
  } else if (currentX > targetX) {
    if (currentX - speed <= targetX) {
      currentX = targetX;
    } else {
      currentX -= speed;
    }
  }

  if (currentY < targetY) {
    if (currentY + speed >= targetY) {
      currentY = targetY;
    } else {
      currentY += speed;
    }

  } else if (currentY > targetY) {
    if (currentY - speed <= targetY) {
      currentY = targetY;
    } else {
      currentY -= speed;
    }

  }

  ctx.fillStyle = '#f9c02e';
  ctx.beginPath();
  ctx.rect(currentX - rectWidth / 2, currentY - rectHeight / 2, rectWidth, rectHeight);
  ctx.fill();


  if (Math.abs(currentX - targetX) < speed && Math.abs(currentY - targetY) < speed) {
    currentIndex++;
    if (currentIndex < x.length) {
      targetX = x[currentIndex];
      targetY = y[currentIndex];
    } else {
      clearInterval(interval);
      gumb.disabled = false;
      gumb2.disabled = false;
      gumb3.disabled = false;
      slider.disabled = false;
      currentIndex = 1;
      currentX = x[0];
      currentY = y[0];
      targetX = x[1];
      targetY = y[1];
      je = false;
    }
  }
}

let i = 0;
var trail = [];// shramba za vse koordinate za brisanje

function brisi() {
  const rectWidth = 10;  // Adjust this to your desired width
  const rectHeight = 10; // Adjust this to your desired height
  let trailLength = 60;// dolžina repa prej kot začnemo za njim brisati
  if (i == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  i += speed;
  je2 = true;
  gumb.disabled = true;
  gumb2.disabled = true;
  gumb3.disabled = true;
  slider.disabled = true;
  // zapisovanje trenutnih koordinat
  trail.push({ x: currentX, y: currentY });

  //ko gremo čez dolzino repa zacne brisati za njim
  if (i >= trailLength) {
    const tail = trail.shift();  // zbriše najstarejšo koordinato repa
    ctx.clearRect(tail.x - 5, tail.y - 5, 10, 10);  //zbriše pravokotnik za repom
  }


  ctx.beginPath();
  ctx.strokeStyle = '#f9c02e';
  ctx.moveTo(currentX, currentY);


  if (currentX < targetX) {
    if (currentX + speed >= targetX) {
      currentX = targetX
    } else {
      currentX += speed;
    }
  } else if (currentX > targetX) {
    if (currentX - speed <= targetX) {
      currentX = targetX;
    } else {
      currentX -= speed;
    }
  }

  if (currentY < targetY) {
    if (currentY + speed >= targetY) {
      currentY = targetY;
    } else {
      currentY += speed;
    }

  } else if (currentY > targetY) {
    if (currentY - speed <= targetY) {
      currentY = targetY;
    } else {
      currentY -= speed;
    }

  }


  ctx.fillStyle = '#f9c02e';
  ctx.beginPath();
  ctx.rect(currentX - rectWidth / 2, currentY - rectHeight / 2, rectWidth, rectHeight);
  ctx.fill();


  if (Math.abs(currentX - targetX) < speed && Math.abs(currentY - targetY) < speed) {
    currentIndex++;
    if (currentIndex < x.length) {
      targetX = x[currentIndex];
      targetY = y[currentIndex];
    } else {
      if (!(currentX != targetX && currentY != targetY)) {
        clearInterval(interval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gumb.disabled = false;
        gumb2.disabled = false;
        gumb3.disabled = false;
        slider.disabled = false;
        je2 = false;
        currentIndex = 1;
        currentX = x[0];
        currentY = y[0];
        targetX = x[1];
        targetY = y[1];
        trail = [];
        i = 0;
      }
    }
  }
}

//const interval2 = setInterval(brisi, 10);


function updateSpeed() {
  clearInterval(interval);
  var sliderIndex = Math.ceil(slider.value);
  var hitrost;
  if (sliderIndex == 1)
    hitrost = 1;
  if (sliderIndex == 2)
    hitrost = 2;
  if (sliderIndex == 3)
    hitrost = 4;
  if (sliderIndex == 4)
    hitrost = 8;
  speed = hitrost;
  console.log(hitrost);
  if (je && !fromStop)
    interval = setInterval(draw, 10);
  if (je2 && !fromStop)
    interval = setInterval(brisi, 10);
  if (je3 && !fromStop)
    interval = setInterval(slikaMaze, 10);
}


function start(kateri) {
  clearInterval(interval);
  fromStop = false;
  if (kateri == 1) {
    je = true;
    slider.disabled = true;
  }
  if (kateri == 2) {
    je2 = true
    slider.disabled = true;
  }
  if (kateri == 3) {
    je3 = true;
    slider.disabled = true;
    const sir = document.getElementById('sigma');
    const podgana = document.getElementById('podganaslika');
    podgana.src = 'img/podganaSuha.png';
    sir.style.visibility='hidden';
  }
  updateSpeed();
}


function stop() {
  fromStop = true;
  clearInterval(interval);
  if (je)
    gumb.disabled = false;
  if (je2)
    gumb2.disabled = false;
  if (je3)
    gumb3.disabled = false;
  slider.disabled = false;
}


function pocisti() {
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  je = false;
  je2 = false;
  je3 = false;
  currentIndex = 1;
  currentX = x[0];
  currentY = y[0];
  targetX = x[1];
  targetY = y[1];
  trail = [];
  frame = 0;
  frameCounter = 0;
  i = 0;
  const sir = document.getElementById('sigma');
  const podgana = document.getElementById('podganaslika');
  const podganaDiv = document.getElementById('podgana');
  podgana.src = 'img/podganaSuha.png'
  podganaDiv.style.visibility = "visible";
  sir.style.visibility ='hidden';
  gumb.disabled = false;
  gumb2.disabled = false;
  gumb3.disabled = false;
  slider.disabled = false;
  iterations=0;
}


const img = new Image();
img.src = 'img/podganaRunSprite.png';

const miniCheese = new Image();
miniCheese.src = 'img/cheeseM.png'

const spriteHeight = 11;
const spriteWidth = 16;
const frames = 8;
var frame = 0;
const framerate = 8;
var frameCounter = 0;
let iterations = 0;
const tolerance = 0; // Allow some tolerance for collision, adjust as needed
const audioQue = new Audio('audio/eating.mp3');
audioQue.volume = 0.2;
function slikaMaze() {
  iterations++;
  je3 = true;
  gumb.disabled = true;
  gumb2.disabled = true;
  gumb3.disabled = true;
  slider.disabled = true;
  podgana.style.visibility = "hidden";
  const clearPadding = 3; // Padding around the object to clear a bit more space
  ctx.clearRect(currentX - spriteWidth / 2 - clearPadding, currentY - spriteHeight / 2 - clearPadding, spriteWidth + clearPadding * 2, spriteHeight + clearPadding * 2);


  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(currentX, currentY);
  if(iterations==1){
    drawRandomImages();
  }
  if (currentX < targetX) {
    if (currentX + speed >= targetX) {
      currentX = targetX
    } else {
      currentX += speed;
    }
  } else if (currentX > targetX) {
    if (currentX - speed <= targetX) {
      currentX = targetX;
    } else {
      currentX -= speed;
    }
  }

  if (currentY < targetY) {
    if (currentY + speed >= targetY) {
      currentY = targetY;
    } else {
      currentY += speed;
    }

  } else if (currentY > targetY) {
    if (currentY - speed <= targetY) {
      currentY = targetY;
    } else {
      currentY -= speed;
    }
  }

  
//pogej za collision
  for (let i = 0; i < food.length; i++) {
    const foodX = food[i].x;
    const foodY = food[i].y;

    if (Math.abs(currentX - foodX) <= tolerance && Math.abs(currentY - foodY) <= tolerance) {
      audioQue.pause();
      audioQue.currentTime = 0;
      console.log("Collision with food at: X:" + foodX + " Y:" + foodY);
      audioQue.play();
      food.splice(i, 1);
    }
  }

  frameCounter++;
  if (frameCounter >= 60 / framerate) {
    frameCounter = 0;
    frame = (frame + 1) % frames;
  }
  const frameX = (frame * spriteWidth) % img.width;
  const frameY = Math.floor((frame * spriteWidth) / img.width) * spriteHeight;
  ctx.drawImage(img, frameX, frameY, spriteWidth, spriteHeight, currentX - img.width / 2 + 30, currentY - img.height / 2 + 5, spriteWidth, spriteHeight);



  if (Math.abs(currentX - targetX) < speed && Math.abs(currentY - targetY) < speed) {
    currentIndex++;
    if (currentIndex < x.length) {
      targetX = x[currentIndex];
      targetY = y[currentIndex];
    } else {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      gumb.disabled = false;
      gumb2.disabled = false;
      gumb3.disabled = false;
      slider.disabled = false;
      currentIndex = 1;
      currentX = x[0];
      currentY = y[0];
      targetX = x[1];
      targetY = y[1];
      frame = 0;
      frameCounter = 0;
      je3 = false;
      iterations=0;
      replaceImage();
    }
  }
}

function replaceImage() {
  const image = document.getElementById('sigma');
  image.src = 'img/podganaFinalReal.png'; // Replace with the path to your new image
  image.style.visibility='visible';
}


function getRandomPoint() {
  const randomIndex = Math.floor(Math.random() * (points.length / 2)) * 2; // Ensure we get pairs of X and Y
  const x = points[randomIndex];
  const y = points[randomIndex + 1];
  return { x, y };
}
function drawRandomImages() {
  for (let i = 0; i < 10; i++) {
    const { x, y } = getRandomPoint();
    ctx.drawImage(miniCheese, x - miniCheese.width/2, y- miniCheese.height/2, 16, 11); // Drawing the image at the random coordinates with size 20x20
    console.log("X:"+x+" Y:"+y);
    food.push({x,y});
  }
}
