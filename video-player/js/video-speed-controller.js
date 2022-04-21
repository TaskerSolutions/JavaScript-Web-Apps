const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
// const video = document.querySelector('.flex');
// already declared in other js file
const min = 0.5;
const max = 4;
let mouseDown = false;

// set initial width css of speed bar based on % of max
bar.style.width = 1 / max * 100 + '%';

function handleMove(e) {
  // exit function if mouse is not down
  if (!mouseDown) return;

  e.preventDefault();

  // get x coords of speed bar
  const x = e.pageX - this.offsetLeft;
  // get decimal of how far left/right the speed bar is dragged
  const decimal = x / this.offsetWidth;
  // convert the decimal into a percentage
  const width = Math.round(decimal * 100) + '%';

  // math to account for custom min/max numbers
  const playbackRate = decimal * (max - min) + min;

  // set the css width of the speed bar to the width const
  bar.style.width = width;

  console.log({x, decimal, width})

  
  bar.textContent = playbackRate.toFixed(2) + '×';
  // set the video playback rate
  video.playbackRate = playbackRate;
}


speed.addEventListener('mousedown', () => mouseDown = true);
speed.addEventListener('mouseup', () => mouseDown = false);
speed.addEventListener('mouseleave', () => mouseDown = false);
speed.addEventListener('mousemove', handleMove);