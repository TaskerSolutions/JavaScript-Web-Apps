const slider = document.querySelector('.items');

// is mouse clicked or not
let isDown = false;

let startX;
let scrollLeft;
let x;
let walk;




slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // record the initial click pos
  // e = the event. Can get click pos from this
  //console.log(e);
  startX = e.pageX - slider.offsetLeft;

  // put scrollLeft into its own variable as slider.scrollLeft will move as the div scrolls
  scrollLeft = slider.scrollLeft;

});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');   
});

slider.addEventListener('mousemove', (e) =>  {
  if (!isDown) return; // stop function if mouse isn't down
  // console.count iterates each time the function is run
  //console.count(isDown);

  // stop browser from selecting text etc.
  e.preventDefault(); 

  x = e.pageX - slider.offsetLeft;

  // walk = how many px of deviation there is
  walk = (x - startX) * 1.8; // add a multiplier for speed here

  console.log(walk);

  // use the initial scrollLeft value to subtract from to avoid jumps
  slider.scrollLeft = scrollLeft - walk;

  
});