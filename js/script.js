
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
  ctx.strokeStyle = 'red';
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

  ctx.fillStyle = 'red';
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
  ctx.strokeStyle = 'red';
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


  ctx.fillStyle = 'red';
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
    sir.src = 'img/cheese.png';
    podgana.src = 'img/podgana.png';
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
  sir.src = 'img/cheese.png'
  podgana.src = 'img/podgana.png'
  podganaDiv.style.zIndex="1000";
  gumb.disabled = false;
  gumb2.disabled = false;
  gumb3.disabled = false;
  slider.disabled = false;
}


const img = new Image();
img.src = 'img/podganaRunSprite.png';
const spriteHeight = 11;
const spriteWidth = 16;
const frames = 8;
var frame = 0;
const framerate = 8;
var frameCounter = 0;


function slikaMaze() {
  je3 = true;
  gumb.disabled = true;
  gumb2.disabled = true;
  gumb3.disabled = true;
  slider.disabled = true;
  podgana.style.zIndex="-1";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.strokeStyle = 'red';
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
      replaceImage();
    }
  }
}

function replaceImage() {
  const image = document.getElementById('sigma');
  image.src = 'img/podganaFinalReal.png'; // Replace with the path to your new image
}