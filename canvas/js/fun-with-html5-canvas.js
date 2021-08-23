const sizeRange = document.querySelector('#size');
const randomSizeCheckbox = document.querySelector("#random-size");
const colorPicker = document.querySelector('#color');
const randomColorCheckbox = document.querySelector("#random-color");
const clearBtn = document.querySelector('#clear-btn');

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

resizeWindow();
// resize the canvas when window size changes
window.addEventListener('resize', resizeWindow);
function resizeWindow() {
  canvas.width = window.innerWidth - 60;
  canvas.height = window.innerHeight - 400;
}

let isDrawing = false;
let lastX = 0;
let lastY = 0;

ctx.strokestyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

let hue = 0;
let direction = true;
let randomSize = true;
let randomColor = true;

function draw(event) {
  // stop the function when mouse is not clicked down
  if(!isDrawing) return;

  if (randomSize) {
    if (direction) {
      ctx.lineWidth ++;
    } else {
      ctx.lineWidth --;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 2)
      direction = !direction;
  }

  // * hue, 100% saturation, 50% lightness
  if (randomColor) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  }

  ctx.beginPath();
  // start stroke from last mouse position
  ctx.moveTo(lastX, lastY);
  // event.offsetX & event.offsetY are values from the MouseEvent
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  // update lastX and lastY for the next time function runs
  //lastX = event.offsetX;
  //lastY = event.offsetY;
  // ES6 trick to set both variables in the same line (structuring an array)
  [lastX, lastY] = [event.offsetX, event.offsetY];

  if (randomColor) {
    hue ++ ;
  }

  // console.log(event);
}

canvas.addEventListener('mousemove', draw);

// rather than single function, using a block () => {} to do multiple things
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
});


canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // to detect if mouse leaves the screen





// line width range selector
// sizeRange.addEventListener('input', adjustSize); // doesn't work with Internet explorer
// use 'change' to only fire when the mouse is released
sizeRange.addEventListener('change', () => {
  ctx.lineWidth = sizeRange.value;
  console.log(ctx.lineWidth);
  $(randomSizeCheckbox).prop('checked', false); // Unchecks it
  randomSize = false;
});

// random size checkbox
randomSizeCheckbox.addEventListener('change', () => {
  if($(randomSizeCheckbox).is(':checked')) {
    randomSize = true;
  } else {
    randomSize = false;
  }
});



// color picker
colorPicker.addEventListener('change', () => {
  ctx.strokeStyle = colorPicker.value;
  console.log(ctx.strokeStyle);
  $(randomCheckbox).prop('checked', false); // Unchecks it
  randomColor = false;
});

// random color checkbox
randomColorCheckbox.addEventListener('change', () => {
  if($(randomColorCheckbox).is(':checked')) {
    randomColor = true;
  } else {
    randomColor = false;
  }
});



// clear canvas button
clearBtn.addEventListener('click', () => {
  if(confirm("Are you sure that you want to clear the canvas?"))
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});