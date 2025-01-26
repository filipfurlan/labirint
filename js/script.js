const points = [234, 2, 234, 10, 122, 10, 122, 26, 202, 26, 202, 42, 170, 42, 170, 106, 154, 106, 154, 154, 170, 154, 170, 138, 186, 138, 186, 170, 138, 170, 138, 202, 90, 202, 90, 234, 58, 234, 58, 250, 90, 250, 90, 266, 74, 266, 74, 330, 106, 330, 106, 362, 122, 362, 122, 378, 106, 378, 106, 394, 74, 394, 74, 410, 106, 410, 106, 426, 122, 426, 122, 410, 138, 410, 138, 426, 154, 426, 154, 394, 138, 394, 138, 378, 154, 378, 154, 362, 138, 362, 138, 346, 170, 346, 170, 394, 186, 394, 186, 298, 202, 298, 202, 314, 218, 314, 218, 330, 202, 330, 202, 346, 218, 346, 218, 362, 202, 362, 202, 378, 234, 378, 234, 362, 266, 362, 266, 410, 250, 410, 250, 394, 202, 394, 202, 426, 218, 426, 218, 442, 250, 442, 250, 426, 282, 426, 282, 442, 298, 442, 298, 474, 266, 474, 266, 458, 234, 458, 234, 474, 250, 474, 250, 482];

const canvas = document.getElementById('canvas'); // Assuming you have a canvas with id 'myCanvas'
const ctx = canvas.getContext('2d');

// Set the desired speed and smoothness control
let speed = 1;  // Controls how fast the lines are drawn (lower = faster)
let steps = 10;  // Controls smoothness of the transition (higher = smoother)

function interpolate(x1, y1, x2, y2, step) {
  // Interpolate the coordinates between two points at a given step
  const dx = (x2 - x1) / steps;
  const dy = (y2 - y1) / steps;

  return {
    x: x1 + dx * step,
    y: y1 + dy * step
  };
}

// Function to animate drawing the path
function animateDrawing() {
  let i = 0;
  let maxIndex = points.length / 2; // Divide by 2 since each point is a pair of x, y

  function drawLine() {
    if (i < maxIndex - 1) {
      const x1 = points[i * 2];
      const y1 = points[i * 2 + 1];
      const x2 = points[(i + 1) * 2];
      const y2 = points[(i + 1) * 2 + 1];

      let step = 0;

      // Draw the line incrementally from (x1, y1) to (x2, y2)
      function drawSmoothLine() {
        if (step <= steps) {
          const { x, y } = interpolate(x1, y1, x2, y2, step);
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x, y);
          ctx.stroke();

          step++;
          requestAnimationFrame(drawSmoothLine); // Continue drawing
        } else {
          // Once this line is finished, move to the next line
          i++;
          setTimeout(drawLine, speed); // Delay before drawing the next line
        }
      }

      drawSmoothLine(); // Start drawing the current segment
    }
  }

  drawLine(); // Start the drawing process
}

// Set up the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
ctx.lineWidth = 2; // Set the line width
ctx.strokeStyle = 'red'; // Set the color of the line

// Start the animation
function reset() {
  let i = points.length / 2 - 1; // Start from the last point

  function eraseLine() {
      if (i > 0) {
          const x1 = points[i * 2];
          const y1 = points[i * 2 + 1];
          const x2 = points[(i - 1) * 2];
          const y2 = points[(i - 1) * 2 + 1];
          let step = steps;

          // Gradually erase the line from (x1, y1) to (x2, y2)
          function eraseSmoothLine() {
              if (step >= 0) {
                  const { x, y } = interpolate(x2, y2, x1, y1, steps - step);

                  // Set the line's alpha transparency to fade out
                  ctx.save();
                  ctx.lineWidth = 2; // Match the original line width
                  ctx.strokeStyle = 'red'; // Keep the original color
                  ctx.globalAlpha = step / steps; // Gradually fade out the line (from opaque to transparent)
                  ctx.globalCompositeOperation = 'destination-out';
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x, y);
                  ctx.stroke();
                  ctx.restore();

                  step--;
                  requestAnimationFrame(eraseSmoothLine);
              } else {
                  i--;
                  setTimeout(eraseLine, speed); // Move to the next segment after erasing this one
              }
          }

          eraseSmoothLine();
      } else {
          // After all lines are erased, ensure the canvas is cleared
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
  }

  eraseLine(); // Start the erasing process
}











// Function to control the speed (you can call this with new speed values)
function setSpeed(newSpeed) {
  speed = newSpeed;  // Update speed
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before redrawing
  animateDrawing(); // Restart animation with the new speed
}

// Function to control the smoothness (you can call this with new steps values)
function setSmoothness(newSteps) {
  steps = newSteps;  // Update smoothness
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before redrawing
  animateDrawing(); // Restart animation with the new smoothness
}
